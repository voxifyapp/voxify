import { Activity } from './activity';
import { TextBlock } from './blocks/text-block';
export interface MultipleChoiceActivityData {
    question: TextBlock;
    options: TextBlock[];
    /**
     * Id of the answer, multiple answers are allowed
     */
    answer: string[];
}
export declare type MultipleChoiceActivityAnswer = {
    answer: string[];
};
export declare const ACTIVITY_TYPE_MULTIPLE_CHOICE = "MULTIPLE_CHOICE";
export declare class MultipleChoiceActivity extends Activity<MultipleChoiceActivityData, MultipleChoiceActivityAnswer> {
    constructor(data?: MultipleChoiceActivityData);
    setQuestion(question: TextBlock): void;
    getQuestion(): TextBlock;
    getOptions(): TextBlock[];
    setOptions(options: TextBlock[]): void;
    getAnswer(): string[];
    getIsMultipleAnswer(): boolean;
    setAnswer(answer: string[]): void;
    /**
     * Returns options that are incorrect, else returns nothing
     */
    checkAnswer(answer: MultipleChoiceActivityAnswer): string[];
    build(): MultipleChoiceActivityData & {
        type: string;
    };
}
