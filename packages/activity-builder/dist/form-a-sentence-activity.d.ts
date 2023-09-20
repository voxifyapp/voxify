import { Activity } from "./activity";
import { TextBlock } from "./blocks/text-block";
export interface FormASentenceActivityData {
    prompt: TextBlock;
    answer: string[];
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
    checkAnswer(answer: FormASentenceActivityAnswer): string[];
    build(): FormASentenceActivityData & {
        type: string;
    };
}
