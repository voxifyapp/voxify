"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PronunciationActivity = void 0;
const activity_1 = require("./activity");
const text_block_1 = require("./blocks/text-block");
const MATCHED_WORDS_PERCENTAGE_TO_BE_CORRECT = 40;
class PronunciationActivity extends activity_1.Activity {
    constructor(data) {
        super(activity_1.ActivityType.PRONUNCIATION, data ? Object.assign({}, data) : { prompt: new text_block_1.TextBlock("") });
    }
    setPrompt(prompt) {
        this.setData(Object.assign(Object.assign({}, this.getData()), { prompt }));
    }
    getPrompt() {
        return this.getData().prompt;
    }
    // Hey how are you doing
    // 1. Remove leading words
    // "test test hey how are you doing"
    // 2. A user might say the sentence, and some words might not be picked up
    // "hey are you doing"
    // 3. the skipped word might occur before, and should not be picked up
    // "you are doing" => [false, false, false, false, true, true]
    //4. Users may say the same word multiple times, if it is not picked up
    // "hey hoe hoe hee how are you doing"
    /**
     * Takes in a reference string and an input string, and returns an array the same size of the reference string, with the words that were matched in the input string.
     * Each element in returned array is either a string or null. based on whether it was matched or not
     */
    static matchReferenceStringWithInput(reference, input) {
        const referenceArray = this.convertStringToSanitizedWordArray(reference);
        const inputArray = this.convertStringToSanitizedWordArray(input);
        let referenceIntersectionWords = new Array(referenceArray.length).fill(false);
        let lastMatchedInputWordIndex = 0;
        for (let i = 0; i < inputArray.length; i++) {
            let inputWord = inputArray[i];
            for (let j = lastMatchedInputWordIndex; j < referenceArray.length; j++) {
                let referenceWord = referenceArray[j];
                if (inputWord === referenceWord) {
                    referenceIntersectionWords[j] = true;
                    lastMatchedInputWordIndex = j;
                }
            }
        }
        return referenceIntersectionWords;
    }
    static sanitizeWord(word) {
        return word.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "");
    }
    static convertStringToArray(input) {
        return input.split(/\s+/);
    }
    checkAnswer(answer) {
        //If more than half the words are not detected, let's return wrong
        const matchArray = _a.matchReferenceStringWithInput(this.getPrompt().text, answer.recognizedWords);
        const numberOfWordsMatched = matchArray.filter((a) => !!a).length;
        const recognizedPercent = (numberOfWordsMatched / matchArray.length) * 100;
        if (recognizedPercent >= MATCHED_WORDS_PERCENTAGE_TO_BE_CORRECT) {
            return {
                correct: true,
                recognizedPercent,
            };
        }
        return {
            correct: false,
            recognizedPercent,
        };
    }
    build() {
        if (this.getPrompt().text == "") {
            throw new Error("Need to pass prompt");
        }
        return this.getData();
    }
}
exports.PronunciationActivity = PronunciationActivity;
_a = PronunciationActivity;
PronunciationActivity.convertStringToSanitizedWordArray = (value) => {
    return _a.convertStringToArray(value).map((word) => _a.sanitizeWord(word));
};
//# sourceMappingURL=pronunciation-activity.js.map