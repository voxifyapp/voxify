import { Activity, ActivityType } from "./activity";
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

export class FormASentenceActivity extends Activity<
  FormASentenceActivityData,
  FormASentenceActivityAnswer
> {
  constructor(data?: FormASentenceActivityData) {
    super(
      ActivityType.FORM_A_SENTENCE,
      data ? { ...data } : { prompt: new TextBlock(""), answer: [], words: [] }
    );
  }

  setPrompt(prompt: TextBlock): void {
    this.setData({ ...this.getData(), prompt });
  }

  getPrompt(): TextBlock {
    return this.getData().prompt;
  }

  setAnswer(answer: string[]): void {
    this.setData({ ...this.getData(), answer });
  }

  getAnswer(): string[] {
    return this.getData().answer;
  }

  setWords(words: string[]): void {
    this.setData({ ...this.getData(), words });
  }

  getWords(): string[] {
    return this.getData().words;
  }

  /**
   * @returns the words that are incorrect, else returns nothing
   */
  checkAnswer(answer: FormASentenceActivityAnswer) {
    const answerBank = this.getAnswer();
    const userAnswer = answer.answer;

    if (answerBank.length !== userAnswer.length) {
      return ["Incorrect answer"];
    }

    for (let i = 0; i < answerBank.length; i++) {
      if (answerBank[i] !== userAnswer[i]) {
        return [userAnswer[i]];
      }
    }
    return [];
  }

  // TODO Write tests for this function
  build() {
    // The "answer" array should have all the items in the "words" array
    return this.getData();
  }
}
