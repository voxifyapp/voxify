"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const activity_1 = require("../activity");
const video_activity_1 = require("../video-activity");
describe("VideoActivity", () => {
    it("create an empty video activity", () => {
        const activity = new video_activity_1.VideoActivity();
        expect(activity.getVideoFileName()).toEqual("");
    });
    it("create a video activity from existing data", () => {
        const activity = new video_activity_1.VideoActivity({
            videoFileName: "https://www.youtube.com/watch?v=1",
        });
        expect(activity.getVideoFileName()).toEqual("https://www.youtube.com/watch?v=1");
    });
    it("set video url", () => {
        const activity = new video_activity_1.VideoActivity();
        activity.setVideoFileName("https://www.youtube.com/watch?v=1");
        expect(activity.getVideoFileName()).toEqual("https://www.youtube.com/watch?v=1");
    });
    it("get data should return VIDEO type", () => {
        const activity = new video_activity_1.VideoActivity({
            videoFileName: "https://www.youtube.com/watch?v=1",
        });
        expect(activity.getData().type).toEqual(activity_1.ActivityType.VIDEO);
    });
    it("check answer always returns empty errors", () => {
        const activity = new video_activity_1.VideoActivity({
            videoFileName: "https://www.youtube.com/watch?v=1",
        });
        expect(activity.checkAnswer()).toEqual([]);
    });
});
//# sourceMappingURL=video-activity.spec.js.map