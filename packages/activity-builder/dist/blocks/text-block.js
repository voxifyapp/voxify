"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextBlock = exports.BLOCK_TYPE_TEXT = void 0;
const block_1 = require("./block");
exports.BLOCK_TYPE_TEXT = 'TEXT_BLOCK';
class TextBlock extends block_1.Block {
    constructor(text, blockData = {}) {
        super(exports.BLOCK_TYPE_TEXT, blockData);
        this.text = text;
    }
}
exports.TextBlock = TextBlock;
//# sourceMappingURL=text-block.js.map