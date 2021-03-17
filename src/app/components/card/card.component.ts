import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Card } from "../../model/card.model";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: Card;
  @Input() listIndex: number;
  @Input() cardIndex: number;

  cardHeader: FormControl = new FormControl({ value: null, disabled: true });
  cardSummary: FormControl = new FormControl({ value: null, disabled: true });

  constructor() { }

  ngOnInit(): void {
    if (this.card.header) this.cardHeader.patchValue(this.card.header);
    else this.cardHeader.enable();
    if (this.card.summary) this.cardSummary.patchValue(this.card.summary);
    else this.cardSummary.enable();
  }

  draggedCard(e: DragEvent) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';
    const cardInfo = {
      'listIndex': this.listIndex,
      'cardIndex': this.cardIndex
    }
    e.dataTransfer.setData('text', JSON.stringify(cardInfo));
  }

  dropBoard(e: DragEvent) {
    e.dataTransfer.dropEffect = 'move';
    e.preventDefault();
  }

  headerValueChange(e: any) {
    if (!this.cardHeader.value || this.cardHeader.value == "") return;
    this.card.header = this.cardHeader.value;
  }

  summaryValueChange(e: any) {
    if (!this.cardSummary.value || this.cardSummary.value == "") return;
    this.card.summary = this.cardSummary.value;
  }
}
