"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const video_activity_1 = require("../video-activity");
describe('VideoActivity', () => {
    it('create an empty video activity', () => {
        const activity = new video_activity_1.VideoActivity();
        expect(activity.getVideoUrl()).toEqual('');
    });
    it('create a video activity from existing data', () => {
        const activity = new video_activity_1.VideoActivity({
            videoUrl: 'https://www.youtube.com/watch?v=1',
        });
        expect(activity.getVideoUrl()).toEqual('https://www.youtube.com/watch?v=1');
    });
    it('set video url', () => {
        const activity = new video_activity_1.VideoActivity();
        activity.setVideoUrl('https://www.youtube.com/watch?v=1');
        expect(activity.getVideoUrl()).toEqual('https://www.youtube.com/watch?v=1');
    });
    it('get data should return VIDEO type', () => {
        const activity = new video_activity_1.VideoActivity({
            videoUrl: 'https://www.youtube.com/watch?v=1',
        });
        expect(activity.getData().type).toEqual(video_activity_1.ACTIVITY_TYPE_VIDEO);
    });
    it('check answer always returns empty errors', () => {
        const activity = new video_activity_1.VideoActivity({
            videoUrl: 'https://www.youtube.com/watch?v=1',
        });
        expect(activity.checkAnswer()).toEqual([]);
    });
});
//# sourceMappingURL=video-activity.spec.js.map