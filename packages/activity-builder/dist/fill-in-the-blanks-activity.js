"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FillInTheBlanksActivity = void 0;
const activity_1 = require("./activity");
const text_block_1 = require("./blocks/text-block");
class FillInTheBlanksActivity extends activity_1.Activity {
    constructor(data) {
        super(activity_1.ActivityType.FILL_IN_THE_BLANKS, data
            ? Object.assign(Object.assign({}, data), { question: new text_block_1.TextBlock(data.question.text, data.question), options: data.options.map((option) => new text_block_1.TextBlock(option.text, option)) }) : { question: new text_block_1.TextBlock(""), options: [], answer: {} });
    }
    static blank(name) {
        return `$$${name}$$`;
    }
    /**
     * Make sure to include the blanks using the blank() function
     */
    setQuestion(question) {
        this.setData(Object.assign(Object.assign({}, this.getData()), { question }));
    }
    getQuestion() {
        return this.getData().question;
    }
    getOptions() {
        return this.getData().options;
    }
    setOptions(options) {
        this.setData(Object.assign(Object.assign({}, this.getData()), { options }));
    }
    getAnswer() {
        return this.getData().answer;
    }
    setAnswer(answer) {
        this.setData(Object.assign(Object.assign({}, this.getData()), { answer }));
    }
    checkAnswer(answer) {
        const answerBank = this.getAnswer();
        const errors = [];
        for (const blank in answer) {
            if (answerBank[blank] !== answer[blank]) {
                errors.push(blank);
            }
        }
        return { wrongBlanks: errors };
    }
    build() {
        return this.getData();
    }
}
exports.FillInTheBlanksActivity = FillInTheBlanksActivity;
FillInTheBlanksActivity.BLANK_FORMAT = /(\$\$[a-zA-Z0-9_]+\$\$)/;
//# sourceMappingURL=fill-in-the-blanks-activity.js.map