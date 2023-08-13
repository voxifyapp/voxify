import { Activity } from "./activity";

export interface VideoActivityData {
    videoUrl: string;
}

export const VIDEO = "VIDEO";
export class VideoActivity extends Activity<VideoActivityData> {
    constructor(data?: VideoActivityData) {
        super(VIDEO, data || {videoUrl: ""});
    }

    static fromExisting(data: VideoActivityData): VideoActivity {
        const activity = new VideoActivity(data);
        return activity;
    }

    public setVideoUrl(url: string): void {
        this.setData({...this.getData(), videoUrl: url});
    }

    public getVideoUrl(): string {
        return this.getData().videoUrl;
    }

    checkAnswer(answer: object): boolean {
        return false
    }
}