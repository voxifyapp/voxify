export class Block {
  id: string;
  type: string;

  constructor(type: string, id?: string) {
    this.type = type;
    this.id = id || '' + Math.floor(Math.random() * 9000) + 1000;
  }
}
