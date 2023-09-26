"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextActivity = void 0;
const activity_1 = require("./activity");
const text_block_1 = require("./blocks/text-block");
class TextActivity extends activity_1.Activity {
    constructor(data) {
        super(activity_1.ActivityType.TEXT, data
            ? Object.assign(Object.assign({}, data), { title: new text_block_1.TextBlock(data.title.text, data.title), description: new text_block_1.TextBlock(data.title.text, data.title) }) : { title: new text_block_1.TextBlock(""), description: new text_block_1.TextBlock("") });
    }
    setTitle(title) {
        this.setData(Object.assign(Object.assign({}, this.getData()), { title }));
    }
    getTitle() {
        return this.getData().title;
    }
    setDescription(description) {
        this.setData(Object.assign(Object.assign({}, this.getData()), { description }));
    }
    getDescription() {
        return this.getData().description;
    }
    checkAnswer() {
        return [];
    }
    build() {
        return this.getData();
    }
}
exports.TextActivity = TextActivity;
//# sourceMappingURL=text-activity.js.map