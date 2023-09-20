"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const text_block_1 = require("../blocks/text-block");
const fill_in_the_blanks_activity_1 = require("../fill-in-the-blanks-activity");
describe("FillInTheBlanksActivity", () => {
    it("create an empty fill in the blanks activity", () => {
        const activity = new fill_in_the_blanks_activity_1.FillInTheBlanksActivity();
        expect(activity.getQuestion().text).toEqual("");
        expect(activity.getOptions().length).toEqual(0);
        expect(activity.getAnswer()).toEqual({});
    });
    it("should be able to set question, options and answer", () => {
        const activity = new fill_in_the_blanks_activity_1.FillInTheBlanksActivity();
        activity.setQuestion(new text_block_1.TextBlock("This i a $$blank1$$ day"));
        activity.setOptions(["good", "bad"]);
        activity.setAnswer({ blank1: activity.getOptions()[0] });
        expect(activity.getQuestion().text).toEqual("This i a $$blank1$$ day");
        expect(activity.getOptions().length).toEqual(2);
        expect(activity.getAnswer()).toEqual({
            blank1: activity.getOptions()[0],
        });
    });
    it("should be able to create from existing data", () => {
        const activity = new fill_in_the_blanks_activity_1.FillInTheBlanksActivity();
        activity.setQuestion(new text_block_1.TextBlock("This is a $$blank1$$ day"));
        activity.setOptions(["Option 1"]);
        activity.setAnswer({ blank1: activity.getOptions()[0] });
        const activity2 = new fill_in_the_blanks_activity_1.FillInTheBlanksActivity(JSON.parse(JSON.stringify(activity.getData())));
        expect(activity.getQuestion().id).toEqual(activity2.getQuestion().id);
        expect(activity.getOptions()[0]).toEqual(activity2.getOptions()[0]);
        expect(activity.getAnswer()).toEqual(activity2.getAnswer());
    });
    it("should be able to return wrong blanks", () => {
        const activity = new fill_in_the_blanks_activity_1.FillInTheBlanksActivity();
        activity.setQuestion(new text_block_1.TextBlock("This is a $$blank1$$ day"));
        activity.setOptions(["Option 1", "Option 2"]);
        activity.setAnswer({ $$blank1$$: activity.getOptions()[0] });
        expect(activity.checkAnswer({ $$blank1$$: activity.getOptions()[1] })).toEqual(expect.objectContaining({ wrongBlanks: ["$$blank1$$"] }));
    });
    it("should return empty array if correct", () => {
        const activity = new fill_in_the_blanks_activity_1.FillInTheBlanksActivity();
        activity.setQuestion(new text_block_1.TextBlock("This is a $$blank1$$ day"));
        activity.setOptions(["Option 1", "Option 2"]);
        activity.setAnswer({ $$blank1$$: activity.getOptions()[0] });
        expect(activity.checkAnswer({ $$blank1$$: activity.getOptions()[0] })).toEqual(expect.objectContaining({ wrongBlanks: [] }));
    });
});
//# sourceMappingURL=fill-in-the-blanks-activity.spec.js.map