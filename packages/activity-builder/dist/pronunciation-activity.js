"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PronunciationActivity = exports.ACTIVITY_TYPE_PRONUNCIATION = void 0;
const activity_1 = require("./activity");
const text_block_1 = require("./blocks/text-block");
exports.ACTIVITY_TYPE_PRONUNCIATION = 'PRONUNCIATION';
class PronunciationActivity extends activity_1.Activity {
    constructor(data) {
        super(exports.ACTIVITY_TYPE_PRONUNCIATION, data ? Object.assign({}, data) : { prompt: new text_block_1.TextBlock('') });
    }
    setPrompt(prompt) {
        this.setData(Object.assign(Object.assign({}, this.getData()), { prompt }));
    }
    getPrompt() {
        return this.getData().prompt;
    }
    //TODO Need to implement after finalizing the Speech to Text API
    checkAnswer() {
        return [];
    }
    build() {
        return this.getData();
    }
}
exports.PronunciationActivity = PronunciationActivity;
//# sourceMappingURL=pronunciation-activity.js.map