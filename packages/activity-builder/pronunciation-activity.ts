import { Activity, ActivityType } from "./activity";
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

const MATCHED_WORDS_PERCENTAGE_TO_BE_CORRECT = 40;
export class PronunciationActivity extends Activity<
  PronunciationActivityData,
  PronunciationActivityAnswer
> {
  constructor(data?: PronunciationActivityData) {
    super(
      ActivityType.PRONUNCIATION,
      data ? { ...data } : { prompt: new TextBlock("") }
    );
  }

  setPrompt(prompt: TextBlock): void {
    this.setData({ ...this.getData(), prompt });
  }

  getPrompt(): TextBlock {
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
  static matchReferenceStringWithInput(
    reference: string,
    input: string
  ): (true | false)[] {
    const referenceArray = this.convertStringToSanitizedWordArray(reference);
    const inputArray = this.convertStringToSanitizedWordArray(input);

    let referenceIntersectionWords: (true | false)[] = new Array(
      referenceArray.length
    ).fill(false);
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

  static convertStringToSanitizedWordArray = (value: string) => {
    return this.convertStringToArray(value).map((word) =>
      this.sanitizeWord(word)
    );
  };

  static sanitizeWord(word: string) {
    return word.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "");
  }

  static convertStringToArray(input: string) {
    return input.split(/\s+/);
  }

  checkAnswer(
    answer: PronunciationActivityAnswer
  ): PronunciationAnswerErrorType {
    //If more than half the words are not detected, let's return wrong
    const matchArray = PronunciationActivity.matchReferenceStringWithInput(
      this.getPrompt().text,
      answer.recognizedWords
    );

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

export type PronunciationAnswerErrorType = {
  correct: boolean;
  recognizedPercent: number;
};
