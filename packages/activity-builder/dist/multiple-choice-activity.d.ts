import { Activity } from "./activity";
import { TextBlock } from "./blocks/text-block";
export interface MultipleChoiceActivityData {
    question: TextBlock;
    options: TextBlock[];
    /**
     * Id of the answer, multiple answers are allowed
     */
    answer: string[];
}
export type MultipleChoiceActivityAnswer = {
    answer: string[];
};
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
    checkAnswer(answer: MultipleChoiceActivityAnswer): MultipleChoiceAnswerErrorsType;
    build(): MultipleChoiceActivityData & {
        type: string;
    };
}
export type MultipleChoiceAnswerErrorsType = {
    wrongOptions: string[];
};
