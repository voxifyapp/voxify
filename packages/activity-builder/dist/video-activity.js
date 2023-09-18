"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoActivity = exports.ACTIVITY_TYPE_VIDEO = void 0;
const activity_1 = require("./activity");
exports.ACTIVITY_TYPE_VIDEO = 'VIDEO';
class VideoActivity extends activity_1.Activity {
    constructor(data) {
        super(exports.ACTIVITY_TYPE_VIDEO, data || { videoUrl: '' });
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