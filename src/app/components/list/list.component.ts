import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Card, CardInterface } from 'src/app/model/card.model';
import { ListInterface } from "../../model/list.model";
import { MovementIntf, Movement } from "../../model/movement.model";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() list: ListInterface;
  @Input() listIndex: number;
  @Output() moveCardAcrossList: EventEmitter<MovementIntf> = new EventEmitter<MovementIntf>();
  @Output() newCardAdded: EventEmitter<Card> = new EventEmitter<CardInterface>();
  @Output() deleteList: EventEmitter<number> = new EventEmitter<number>();

  private cardCount = 0;

  listName: FormControl = new FormControl({ value: null, disabled: true });

  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  ngOnInit(): void {
    if(this.list.name) this.listName.patchValue(this.list.name);
    else this.listName.enable();
  }

  addNewCard() {
    const card = new Card(this.cardCount++ + '', 'header' + this.cardCount, 'summary' + this.cardCount, 'sample desc');
    this.list.cards.push(card);
    this.newCardAdded.emit(card);
  }

  allowCardReplacement(e: DragEvent) {
    e.dataTransfer.dropEffect = 'move';
    e.preventDefault();
  }

  dropCard(e: DragEvent) {
    const data = JSON.parse(e.dataTransfer.getData('text'));
    const elements: Element[] = this.document.elementFromPoint(e.x, e.y);
    const cardElementBeingDroppedOn = elements.find(x => x.tagName.toLowerCase() === 'app-card');
    const listElementBeingDroppedOn = elements.find(x => x.tagName.toLowerCase() === 'app-list');
    const listIndexDroppedOn = parseInt(listElementBeingDroppedOn.getAttribute('listIndex'), 10);
    const cardIndexDroppedOn = cardElementBeingDroppedOn === undefined ? undefined :
      parseInt(cardElementBeingDroppedOn.getAttribute('cardIndex'), 10);
    const listIndexDragged = parseInt(data.listIndex, 10);
    const cardIndexDragged = parseInt(data.cardIndex, 10);

    // same list, shuffle cards
    if (listIndexDragged === listIndexDroppedOn) {
      const cardDragged = this.list.cards.splice(cardIndexDragged, 1);
      this.list.cards.splice(cardIndexDroppedOn, 0, ...cardDragged);
    } else {
      this.moveCardAcrossList.emit(new Movement(listIndexDragged, listIndexDroppedOn, cardIndexDragged, cardIndexDroppedOn));
    }
  }

  delete() {
    this.deleteList.emit(this.listIndex);
  }

  updateListName(e: any) {
    this.list.name = this.listName.value;
  }
}
