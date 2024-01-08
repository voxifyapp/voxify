import { Activity } from "./activity";
import { TextBlock } from "./blocks/text-block";
export interface PronunciationActivityData {
    prompt: TextBlock;
}
export interface PronunciationActivityAnswer {
    /**
     * Returns null where the word was not detected or incorrect
     * else returns the string that was detected
     */
    recognizedWords: string;
}
export declare class PronunciationActivity extends Activity<PronunciationActivityData, PronunciationActivityAnswer> {
    constructor(data?: PronunciationActivityData);
    setPrompt(prompt: TextBlock): void;
    getPrompt(): TextBlock;
    /**
     * Takes in a reference string and an input string, and returns an array the same size of the reference string, with the words that were matched in the input string.
     * Each element in returned array is either a string or null. based on whether it was matched or not
     */
    static matchReferenceStringWithInput(reference: string, input: string): (true | false)[];
    static convertStringToSanitizedWordArray: (value: string) => string[];
    static sanitizeWord(word: string): string;
    static convertStringToArray(input: string): string[];
    checkAnswer(answer: PronunciationActivityAnswer): PronunciationAnswerErrorType;
    build(): PronunciationActivityData & {
        type: string;
    };
}
export type PronunciationAnswerErrorType = {
    correct: boolean;
    recognizedPercent: number;
};
