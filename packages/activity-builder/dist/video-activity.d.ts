import { Activity } from './activity';
export interface VideoActivityData {
    videoUrl: string;
}
export interface VideoActivityAnswer {
    completionTime?: number;
}
export declare const ACTIVITY_TYPE_VIDEO = "VIDEO";
export declare class VideoActivity extends Activity<VideoActivityData, VideoActivityAnswer> {
    constructor(data?: VideoActivityData);
    setVideoUrl(url: string): void;
    getVideoUrl(): string;
    checkAnswer(): never[];
    build(): VideoActivityData & {
        type: string;
    };
}
