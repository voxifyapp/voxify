import { Activity } from "./activity";
import { TextBlock } from "./blocks/text-block";
export interface FillInTheBlanksActivityData {
    /** The question will have blanks represented as $$blank_id$$ */
    question: TextBlock;
    /** Options available for the blanks */
    options: string[];
    /** A mapping from $$blank_id$$ (see question) => option. eg: { $$blank1$$: "hello" } */
    answer: Record<string, string>;
}
/**
 * The answer is a map of blank name to the option id
 */
export type FillInTheBlanksActivityAnswer = Record<string, string>;
export declare class FillInTheBlanksActivity extends Activity<FillInTheBlanksActivityData, FillInTheBlanksActivityAnswer> {
    constructor(data?: FillInTheBlanksActivityData);
    static BLANK_FORMAT: RegExp;
    static blank(name: string): string;
    /**
     * Make sure to include the blanks using the blank() function
     */
    setQuestion(question: TextBlock): void;
    getQuestion(): TextBlock;
    getOptions(): string[];
    setOptions(options: string[]): void;
    getAnswer(): Record<string, string>;
    setAnswer(answer: Record<string, string>): void;
    checkAnswer(answer: FillInTheBlanksActivityAnswer): FillInTheBlanksAnswerErrorsType;
    build(): FillInTheBlanksActivityData & {
        type: string;
    };
}
export type FillInTheBlanksAnswerErrorsType = {
    wrongBlanks: string[];
};
