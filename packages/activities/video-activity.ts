import { Activity } from "./activity";

export interface VideoActivityData {
    videoUrl: string;
}

export interface VideoActivityAnswer {
    completionTime?: number;
}

export const VIDEO = "VIDEO";
export class VideoActivity extends Activity<VideoActivityData, VideoActivityAnswer> {
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

    checkAnswer(answer: VideoActivityAnswer): boolean {
        return true;
    }
}