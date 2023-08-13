export class Block {
    id: number
    type: string;
    
    constructor(type: string) {
        this.type = type;
        this.id = Math.floor(Math.random() * 9000) + 1000;
    }
}