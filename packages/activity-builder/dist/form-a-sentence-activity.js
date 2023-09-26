"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormASentenceActivity = void 0;
const activity_1 = require("./activity");
const text_block_1 = require("./blocks/text-block");
class FormASentenceActivity extends activity_1.Activity {
    constructor(data) {
        super(activity_1.ActivityType.FORM_A_SENTENCE, data ? Object.assign({}, data) : { prompt: new text_block_1.TextBlock(""), answer: [], words: [] });
    }
    setPrompt(prompt) {
        this.setData(Object.assign(Object.assign({}, this.getData()), { prompt }));
    }
    getPrompt() {
        return this.getData().prompt;
    }
    setAnswer(answer) {
        this.setData(Object.assign(Object.assign({}, this.getData()), { answer }));
    }
    getAnswer() {
        return this.getData().answer;
    }
    setWords(words) {
        this.setData(Object.assign(Object.assign({}, this.getData()), { words }));
    }
    getWords() {
        return this.getData().words;
    }
    /**
     * @returns the words that are incorrect, else returns nothing
     */
    checkAnswer(answer) {
        const answerBank = this.getAnswer();
        const userAnswer = answer.answer;
        if (answerBank.length !== userAnswer.length) {
            return { correct: false };
        }
        for (let i = 0; i < answerBank.length; i++) {
            if (answerBank[i] !== userAnswer[i]) {
                return { correct: false };
            }
        }
        return { correct: true };
    }
    build() {
        return this.getData();
    }
}
exports.FormASentenceActivity = FormASentenceActivity;
//# sourceMappingURL=form-a-sentence-activity.js.map