import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
// import { BoardModel } from 'src/app/model/board.model';
import { Card, CardInterface } from 'src/app/model/card.model';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  toDoCards: CardInterface[] = [];
  inProgressCards: CardInterface[] = [];
  readyForReviewCards: CardInterface[] = [];
  completeCards: CardInterface[] = [];

  refreshBoards: boolean = false;
  savingBoards: boolean = false;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    if(!this.storageService.getBoard()) return;
    const boards = this.storageService.getBoard();
    for (let i = 0; i < boards.length; i++) {
      if (boards[i].length > 0) {
        switch (i) {
          case 0:
            this.toDoCards = boards[i];
            break;
          case 1:
            this.inProgressCards = boards[i];
            break;
          case 2:
            this.readyForReviewCards = boards[i];
            break;
          case 3:
            this.completeCards = boards[i];
            break;

          default:
            break;
        }
      }
    }
  }

  addNewCard(board: number) {
    this.refreshBoards = true;
    switch (board) {
      case 1:
        this.toDoCards.push(new Card(new Date().toLocaleString('en-US'), new FormControl(null), new FormControl(null)));
        break;
      case 2:
        this.inProgressCards.push(new Card(new Date().toLocaleString('en-US'), new FormControl(null), new FormControl(null)));
        break;
      case 3:
        this.readyForReviewCards.push(new Card(new Date().toLocaleString('en-US'), new FormControl(null), new FormControl(null)));
        break;
      case 4:
        this.completeCards.push(new Card(new Date().toLocaleString('en-US'), new FormControl(null), new FormControl(null)));
        break;
      default:
        break;
    }
    this.refreshBoards = false;
  }

  deleteCard(board: number, i: number) {
    this.refreshBoards = true;
    switch (board) {
      case 1:
        this.toDoCards.splice(i, 1);
        break;
      case 2:
        this.inProgressCards.splice(i, 1);
        break;
      case 3:
        this.readyForReviewCards.splice(i, 1);
        break;
      case 4:
        this.completeCards.splice(i, 1);
        break;
      default:
        break;
    }
    this.refreshBoards = false;
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.saveState(Event);
    }
  }

  saveState(e: any) {
    this.savingBoards = true;
    this.storageService.saveBoard([this.toDoCards, this.inProgressCards, this.readyForReviewCards, this.completeCards]);
    setTimeout(() => {
      this.savingBoards = false;
    }, 2000);
  }
}

// use below code to build drag and srop with dynamic board add
// boards: BoardModel[];
//   boardNameControl: FormControl[] = [];
//   cardContentControl: any = [[], [], [], []];
//   refreshBoardsView: boolean = false;
//   disableAddBoardButton: boolean = false;
// addBoard() {
//   var newBoard = new BoardModel(new Date().toLocaleDateString('en-US'), null, []);
//   this.boards.push(newBoard);
//   this.boardNameControl.push(new FormControl(null));
//   if (this.boards.length === 4) this.disableAddBoardButton = true;
// }
// updateBoardName(i: number) {
//   this.boards[i].name = this.boardNameControl[i].value;
// }
// deleteBoard(i: number) {
//   this.refreshBoardsView = true;
//   this.boards.splice(i, 1);
//   this.boardNameControl.splice(i, 1);
//   if (this.boards.length < 4) this.disableAddBoardButton = false;
//   this.refreshBoardsView = false;
// }
// addNewCard(i: number) {
//   this.boards[i].cards.push(new Card(this.boards[i].id, null, null));
//   this.cardContentControl[i].push({
//     header: new FormControl(null),
//     description: new FormControl()
//   });
// }
// deleteCard(i: number, j: number) {
//   this.boards[i].cards.splice(j, 1);
//   this.cardContentControl.splice(j, 1);
// }
// drop(event: CdkDragDrop<CardInterface[]>) {
//   console.log(event.previousContainer, event.container, event.previousContainer.data,
//     event.container.data, event.previousIndex, event.currentIndex)
//   if (event.previousContainer === event.container) {
//     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
//   } else {
//     transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
//   }
// }
