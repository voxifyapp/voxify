"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoActivity = void 0;
const activity_1 = require("./activity");
class VideoActivity extends activity_1.Activity {
    constructor(data) {
        super(activity_1.ActivityType.VIDEO, data || { videoUrl: "" });
    }
    setVideoUrl(url) {
        this.setData(Object.assign(Object.assign({}, this.getData()), { videoUrl: url }));
    }
    getVideoUrl() {
        return this.getData().videoUrl;
    }
    checkAnswer() {
        return [];
    }
    build() {
        return this.getData();
    }
}
exports.VideoActivity = VideoActivity;
//# sourceMappingURL=video-activity.js.map