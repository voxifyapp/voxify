import { Block } from './block';

export const BLOCK_TYPE_TEXT = 'TEXT_BLOCK';
export class TextBlock extends Block {
  text: string;

  constructor(text: string, blockData: { id?: string } = {}) {
    super(BLOCK_TYPE_TEXT, blockData);
    this.text = text;
  }
}
