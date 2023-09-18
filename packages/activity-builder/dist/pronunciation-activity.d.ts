import { Activity } from "./activity";
import { TextBlock } from "./blocks/text-block";
export interface PronunciationActivityData {
    prompt: TextBlock;
}
export interface PronunciationActivityAnswer {
}
export declare const ACTIVITY_TYPE_PRONUNCIATION = "PRONUNCIATION";
export declare class PronunciationActivity extends Activity<PronunciationActivityData, PronunciationActivityAnswer> {
    constructor(data?: PronunciationActivityData);
    setPrompt(prompt: TextBlock): void;
    getPrompt(): TextBlock;
    checkAnswer(): never[];
    build(): PronunciationActivityData & {
        type: string;
    };
}
