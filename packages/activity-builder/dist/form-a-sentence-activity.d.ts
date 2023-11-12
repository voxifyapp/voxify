import { Activity } from "./activity";
import { TextBlock } from "./blocks/text-block";
export interface FormASentenceActivityData {
    prompt: TextBlock;
    /** The words in the correct order */
    answer: string[];
    /** All possible words available for the user to select */
    words: string[];
}
export interface FormASentenceActivityAnswer {
    answer: string[];
}
export declare class FormASentenceActivity extends Activity<FormASentenceActivityData, FormASentenceActivityAnswer> {
    constructor(data?: FormASentenceActivityData);
    setPrompt(prompt: TextBlock): void;
    getPrompt(): TextBlock;
    setAnswer(answer: string[]): void;
    getAnswer(): string[];
    setWords(words: string[]): void;
    getWords(): string[];
    /**
     * @returns the words that are incorrect, else returns nothing
     */
    checkAnswer(answer: FormASentenceActivityAnswer): FormASentenceAnswerErrorType;
    build(): FormASentenceActivityData & {
        type: string;
    };
}
export declare type FormASentenceAnswerErrorType = {
    correct: boolean;
};
