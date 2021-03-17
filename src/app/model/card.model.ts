import { FormControl } from "@angular/forms";

export interface CardInterface {
    id: string;
    header: FormControl;
    description: FormControl;
}

export class Card implements CardInterface {

    constructor(
        public id: string,
        public header: FormControl,
        public description: FormControl
    ) { }
}