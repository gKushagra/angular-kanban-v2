import { CardInterface } from "./card.model";

export interface BoardInterface {
    id: string;
    name: string;
    cards: CardInterface[]
}

export class BoardModel implements BoardInterface {

    constructor(
        public id: string,
        public name: string,
        public cards: CardInterface[]
    ) { }
}