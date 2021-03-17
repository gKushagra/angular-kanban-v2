import { Injectable } from "@angular/core";
import { BoardModel } from "../model/board.model";
import { BoardService } from "./board.service";

@Injectable({ providedIn: "root" })
export class StorageService extends BoardService {

    public saveBoard(board: BoardModel) {
        localStorage.setItem('board', JSON.stringify(board));
    }

    public getBoard(): BoardModel {
        const item = localStorage.getItem('board');
        return JSON.parse(item || '{}');
    }
}