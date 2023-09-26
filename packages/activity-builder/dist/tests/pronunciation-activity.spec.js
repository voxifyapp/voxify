"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const text_block_1 = require("../blocks/text-block");
const pronunciation_activity_1 = require("../pronunciation-activity");
describe('PronunciationActivity', () => {
    it('create an empty activity', () => {
        const activity = new pronunciation_activity_1.PronunciationActivity();
        expect(activity.getPrompt().text).toEqual('');
    });
    it('create activity from existing data', () => {
        const activity = new pronunciation_activity_1.PronunciationActivity({
            prompt: new text_block_1.TextBlock('The sentence to pronounce'),
        });
        expect(new pronunciation_activity_1.PronunciationActivity(JSON.parse(JSON.stringify(activity.getData()))).getPrompt().id).toEqual(activity.getPrompt().id);
    });
    it('set prompt', () => {
        const activity = new pronunciation_activity_1.PronunciationActivity();
        activity.setPrompt(new text_block_1.TextBlock('The sentence to pronounce'));
        expect(activity.getPrompt().text).toEqual('The sentence to pronounce');
    });
});
//# sourceMappingURL=pronunciation-activity.spec.js.map