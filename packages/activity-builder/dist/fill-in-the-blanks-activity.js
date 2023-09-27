"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FillInTheBlanksActivity = void 0;
const lodash_1 = require("lodash");
const activity_1 = require("./activity");
const text_block_1 = require("./blocks/text-block");
class FillInTheBlanksActivity extends activity_1.Activity {
    constructor(data) {
        super(activity_1.ActivityType.FILL_IN_THE_BLANKS, data
            ? Object.assign(Object.assign({}, data), { question: new text_block_1.TextBlock(data.question.text, data.question) }) : { question: new text_block_1.TextBlock(""), options: [], answer: {} });
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
    static getBlanksFromQuestion(question) {
        return question.match(/\$\$.*?\$\$/g) || [];
    }
    //TODO Write tests for this!
    build() {
        const blanks = FillInTheBlanksActivity.getBlanksFromQuestion(this.getQuestion().text);
        const answerBank = this.getAnswer();
        const options = this.getOptions();
        const answerOptions = (0, lodash_1.values)(answerBank);
        // Check if all the blanks have an answer
        if (!(0, lodash_1.every)(blanks, (blank) => answerBank[blank]))
            throw new Error("Every blank needs to have an answer");
        // Check if all the answer options have greater than or equal to the number of options
        // For eg: if there are 2 blanks in a sentence with the same answer "my", there should at least 2 options "my"
        const answerOptionsCount = (0, lodash_1.countBy)(answerOptions);
        const optionsCount = (0, lodash_1.countBy)(options);
        if (!(0, lodash_1.every)(answerOptionsCount, (answerOptionCount, answerOption) => optionsCount[answerOption] >= answerOptionCount)) {
            throw new Error("The options should have all the options in the answer. Refresh the page and try again.");
        }
        return this.getData();
    }
}
exports.FillInTheBlanksActivity = FillInTheBlanksActivity;
FillInTheBlanksActivity.BLANK_FORMAT = /(\$\$[a-zA-Z0-9_]+\$\$)/;
//# sourceMappingURL=fill-in-the-blanks-activity.js.map