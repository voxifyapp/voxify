"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const text_block_1 = require("../blocks/text-block");
const text_activity_1 = require("../text-activity");
describe('TextActivity', () => {
    it('create an empty activity', () => {
        const activity = new text_activity_1.TextActivity();
        expect(activity.getTitle().text).toEqual('');
        expect(activity.getDescription().text).toEqual('');
    });
    it('create activity from existing data', () => {
        const activity = new text_activity_1.TextActivity({
            title: new text_block_1.TextBlock('Title of the text activity'),
            description: new text_block_1.TextBlock('Description of the text activity'),
        });
        expect(new text_activity_1.TextActivity(JSON.parse(JSON.stringify(activity.getData()))).getTitle().id).toEqual(activity.getTitle().id);
        expect(new text_activity_1.TextActivity(JSON.parse(JSON.stringify(activity.getData()))).getDescription().id).toEqual(activity.getDescription().id);
    });
    it('set prompt', () => {
        const activity = new text_activity_1.TextActivity();
        activity.setTitle(new text_block_1.TextBlock('Title of the text activity'));
        activity.setDescription(new text_block_1.TextBlock('Description of the text activity'));
        expect(activity.getTitle().text).toEqual('Title of the text activity');
        expect(activity.getDescription().text).toEqual('Description of the text activity');
    });
});
//# sourceMappingURL=text-activity.spec.js.map