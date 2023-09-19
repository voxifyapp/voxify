"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoActivity = void 0;
const activity_1 = require("./activity");
class VideoActivity extends activity_1.Activity {
    constructor(data) {
        super(activity_1.ActivityType.VIDEO, data || { videoFileName: "" });
    }
    setVideoFileName(url) {
        this.setData(Object.assign(Object.assign({}, this.getData()), { videoFileName: url }));
    }
    getVideoFileName() {
        return this.getData().videoFileName;
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