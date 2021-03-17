import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { BoardModel } from "../model/board.model";
import { BoardService } from "./board.service";

@Injectable({ providedIn: "root" })
export class StorageService extends BoardService {

    public saveBoard(boards: any) {
        for (let i = 0; i < boards.length; i++) {
            let cards = [];
            for (let j = 0; j < boards[i].length; j++) {
                cards.push({
                    id: boards[i][j].id,
                    header: boards[i][j].header.value,
                    description: boards[i][j].description.value
                });
            }
            localStorage.setItem(`${i}`, JSON.stringify(cards));
        }
    }

    public getBoard(): any {
        var boards: any = [];
        for (let i = 0; i < 4; i++) {
            const item = localStorage.getItem(`${i}`);
            if (!item) continue;
            let cards = JSON.parse(item);
            let board = [];
            for (let j = 0; j < cards.length; j++) {
                board.push({
                    id: cards[j].id,
                    header: new FormControl(cards[j].header),
                    description: new FormControl(cards[j].description)
                });
            }
            boards.push(board);
        }
        return boards.length > 0 ? boards : null;
    }
}