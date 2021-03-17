import { Component, OnInit } from '@angular/core';
import { BoardModel } from 'src/app/model/board.model';
import { List, ListInterface } from 'src/app/model/list.model';
import { MovementIntf } from 'src/app/model/movement.model';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  lists: ListInterface[];

  constructor(
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    const board = this.storageService.getBoard();
    this.lists = board.lists || [];
  }

  addList() {
    const newList: ListInterface = new List();
    newList.position = this.lists.length + 1;
    newList.name = `List #${newList.position}`;
    if (this.lists === undefined) this.lists = [];
    newList.cards = [];
    this.lists.push(newList);
  }

  moveCardAcrossList(movementInformation: MovementIntf) {
    const cardMoved = this.lists[movementInformation.fromListIdx].cards.splice(movementInformation.fromCardIdx, 1);
    this.lists[movementInformation.toListIdx].cards.splice(movementInformation.toCardIdx, 0, ...cardMoved);
  }

  saveBoard() {
    const boardModel = new BoardModel();
    boardModel.lists = this.lists;
    this.storageService.saveBoard(boardModel);
  }

  deleteList(listIndex: number) {
    this.lists.splice(listIndex, 1);
  }

}
