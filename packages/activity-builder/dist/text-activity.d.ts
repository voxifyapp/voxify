import { Activity } from "./activity";
import { TextBlock } from "./blocks/text-block";
export interface TextActivityData {
    title: TextBlock;
    description: TextBlock;
}
export interface TextActivityAnswer {
}
export declare class TextActivity extends Activity<TextActivityData, TextActivityAnswer> {
    constructor(data?: TextActivityData);
    setTitle(title: TextBlock): void;
    getTitle(): TextBlock;
    setDescription(description: TextBlock): void;
    getDescription(): TextBlock;
    checkAnswer(): never[];
    build(): TextActivityData & {
        type: string;
    };
}
