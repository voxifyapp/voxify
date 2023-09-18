"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipleChoiceActivity = void 0;
const activity_1 = require("./activity");
const text_block_1 = require("./blocks/text-block");
class MultipleChoiceActivity extends activity_1.Activity {
    constructor(data) {
        super(activity_1.ActivityType.MULTIPLE_CHOICE, data
            ? Object.assign(Object.assign({}, data), { question: new text_block_1.TextBlock(data.question.text, data.question), options: data.options.map((o) => new text_block_1.TextBlock(o.text, o)) }) : { question: new text_block_1.TextBlock(""), options: [], answer: [] });
    }
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
    getIsMultipleAnswer() {
        return this.getAnswer().length > 1;
    }
    setAnswer(answer) {
        this.setData(Object.assign(Object.assign({}, this.getData()), { answer }));
    }
    /**
     * Returns options that are incorrect, else returns nothing
     */
    checkAnswer(answer) {
        const answerBank = this.getAnswer();
        const errors = [];
        for (const selectedOption of answer.answer) {
            if (answerBank.indexOf(selectedOption) === -1) {
                errors.push(selectedOption);
            }
        }
        return errors;
    }
    build() {
        return this.getData();
    }
}
exports.MultipleChoiceActivity = MultipleChoiceActivity;
//# sourceMappingURL=multiple-choice-activity.js.map