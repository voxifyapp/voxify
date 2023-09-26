import { Activity } from "./activity";
export interface VideoActivityData {
    videoUrl: string;
}
export interface VideoActivityAnswer {
    completionPercent?: number;
}
export declare class VideoActivity extends Activity<VideoActivityData, VideoActivityAnswer> {
    constructor(data?: VideoActivityData);
    setVideoUrl(url: string): void;
    getVideoUrl(): string;
    checkAnswer(): VideoActivityAnswerErrorsType;
    build(): VideoActivityData & {
        type: string;
    };
}
export type VideoActivityAnswerErrorsType = {};
