"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
class Block {
    constructor(type, { id } = {}) {
        this.type = type;
        this.id = id || '' + Math.floor(Math.random() * 9000) + 1000;
    }
}
exports.Block = Block;
//# sourceMappingURL=block.js.map