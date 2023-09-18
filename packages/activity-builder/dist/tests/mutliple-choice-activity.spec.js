"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const text_block_1 = require("../blocks/text-block");
const multiple_choice_activity_1 = require("../multiple-choice-activity");
describe('MultipleChoiceActivity', () => {
    it('create an empty fill in the blanks activity', () => {
        const activity = new multiple_choice_activity_1.MultipleChoiceActivity();
        expect(activity.getQuestion().text).toEqual('');
        expect(activity.getOptions().length).toEqual(0);
        expect(activity.getAnswer()).toEqual([]);
    });
    it('should be able to set question, options and answer', () => {
        const activity = new multiple_choice_activity_1.MultipleChoiceActivity();
        activity.setQuestion(new text_block_1.TextBlock('Question'));
        activity.setOptions([new text_block_1.TextBlock('Option 1'), new text_block_1.TextBlock('Option 2')]);
        activity.setAnswer([activity.getOptions()[0].id]);
        expect(activity.getQuestion().text).toEqual('Question');
        expect(activity.getOptions().length).toEqual(2);
        expect(activity.getAnswer()).toEqual([activity.getOptions()[0].id]);
    });
    it('should be able to create from existing data', () => {
        const activity = new multiple_choice_activity_1.MultipleChoiceActivity();
        activity.setQuestion(new text_block_1.TextBlock('Question'));
        activity.setOptions([new text_block_1.TextBlock('Option 1')]);
        activity.setAnswer([activity.getOptions()[0].id]);
        const activity2 = new multiple_choice_activity_1.MultipleChoiceActivity(JSON.parse(JSON.stringify(activity.getData())));
        expect(activity.getQuestion().id).toEqual(activity2.getQuestion().id);
        expect(activity.getOptions()[0].id).toEqual(activity2.getOptions()[0].id);
        expect(activity.getAnswer()).toEqual(activity2.getAnswer());
    });
    it('should be able to return wrong options', () => {
        const activity = new multiple_choice_activity_1.MultipleChoiceActivity();
        activity.setOptions([new text_block_1.TextBlock('Option 1'), new text_block_1.TextBlock('Option 2')]);
        activity.setAnswer([activity.getOptions()[0].id]);
        expect(activity.checkAnswer({ answer: [activity.getOptions()[1].id] })).toEqual([activity.getOptions()[1].id]);
    });
    it('should return empty array if correct', () => {
        const activity = new multiple_choice_activity_1.MultipleChoiceActivity();
        activity.setOptions([new text_block_1.TextBlock('Option 1'), new text_block_1.TextBlock('Option 2')]);
        activity.setAnswer([activity.getOptions()[0].id]);
        expect(activity.checkAnswer({ answer: [activity.getOptions()[0].id] })).toEqual([]);
    });
});
//# sourceMappingURL=mutliple-choice-activity.spec.js.map