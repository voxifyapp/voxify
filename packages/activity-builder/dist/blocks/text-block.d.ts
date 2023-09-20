import { Block } from './block';
export declare const BLOCK_TYPE_TEXT = "TEXT_BLOCK";
export declare class TextBlock extends Block {
    text: string;
    constructor(text: string, blockData?: {
        id?: string;
    });
}
