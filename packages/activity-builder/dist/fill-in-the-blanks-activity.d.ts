import { Activity } from './activity';
import { TextBlock } from './blocks/text-block';
export interface FillInTheBlanksActivityData {
    question: TextBlock;
    options: TextBlock[];
    answer: Record<string, string>;
}
/**
 * The answer is a map of blank name to the option id
 */
export declare type FillInTheBlanksActivityAnswer = Record<string, string>;
export declare const ACTIVITY_TYPE_FILL_IN_THE_BLANKS = "FILL_IN_THE_BLANKS";
export declare class FillInTheBlanksActivity extends Activity<FillInTheBlanksActivityData, FillInTheBlanksActivityAnswer> {
    constructor(data?: FillInTheBlanksActivityData);
    static BLANK_FORMAT: RegExp;
    static blank(name: string): string;
    /**
     * Make sure to include the blanks using the blank() function
     */
    setQuestion(question: TextBlock): void;
    getQuestion(): TextBlock;
    getOptions(): TextBlock[];
    setOptions(options: TextBlock[]): void;
    getAnswer(): Record<string, string>;
    setAnswer(answer: Record<string, string>): void;
    checkAnswer(answer: FillInTheBlanksActivityAnswer): FillInTheBlanksAnswerErrorsType;
    build(): FillInTheBlanksActivityData & {
        type: string;
    };
}
export declare type FillInTheBlanksAnswerErrorsType = {
    wrongBlanks: string[];
};
