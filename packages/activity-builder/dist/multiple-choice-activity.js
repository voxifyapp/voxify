"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipleChoiceActivity = void 0;
const lodash_1 = require("lodash");
const activity_1 = require("./activity");
const text_block_1 = require("./blocks/text-block");
class MultipleChoiceActivity extends activity_1.Activity {
    constructor(data) {
        super(activity_1.ActivityType.MULTIPLE_CHOICE, data
            ? Object.assign(Object.assign({}, data), { question: new text_block_1.TextBlock(data.question.text, data.question), options: data.options.map((o) => new text_block_1.TextBlock(o.text, o)) }) : {
            question: new text_block_1.TextBlock(""),
            options: [],
            answer: [],
            isMultipleAnswer: false,
        });
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
        return this.getData().isMultipleAnswer;
    }
    setIsMultipleAnswer(isMultipleAnswer) {
        this.setData(Object.assign(Object.assign({}, this.getData()), { isMultipleAnswer }));
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
        //TODO Add unit tests
        if (!(0, lodash_1.every)(this.getAnswer(), (answer) => (0, lodash_1.includes)(this.getOptions().map((option) => option.id), answer)))
            throw new Error("Answers ids need to be subset of options");
        if (this.getAnswer().length === 0) {
            throw new Error("At least one answer is required");
        }
        return this.getData();
    }
}
exports.MultipleChoiceActivity = MultipleChoiceActivity;
//# sourceMappingURL=multiple-choice-activity.js.map