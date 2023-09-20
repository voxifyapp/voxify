import { countBy, every, values } from "lodash";
import { Activity, ActivityType } from "./activity";
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
 * The answer is a map of blank_id => option eg: { $$blank1$$: "hello" }
 */
export type FillInTheBlanksActivityAnswer = Record<string, string>;

export class FillInTheBlanksActivity extends Activity<
  FillInTheBlanksActivityData,
  FillInTheBlanksActivityAnswer
> {
  constructor(data?: FillInTheBlanksActivityData) {
    super(
      ActivityType.FILL_IN_THE_BLANKS,
      data
        ? {
            ...data,
            question: new TextBlock(data.question.text, data.question),
          }
        : { question: new TextBlock(""), options: [], answer: {} }
    );
  }

  static BLANK_FORMAT = /(\$\$[a-zA-Z0-9_]+\$\$)/;
  static blank(name: string) {
    return `$$${name}$$`;
  }

  /**
   * Make sure to include the blanks using the blank() function
   */
  setQuestion(question: TextBlock): void {
    this.setData({ ...this.getData(), question });
  }

  getQuestion(): TextBlock {
    return this.getData().question;
  }

  getOptions() {
    return this.getData().options;
  }

  setOptions(options: string[]): void {
    this.setData({ ...this.getData(), options });
  }

  getAnswer() {
    return this.getData().answer;
  }

  setAnswer(answer: Record<string, string>): void {
    this.setData({ ...this.getData(), answer });
  }

  checkAnswer(
    answer: FillInTheBlanksActivityAnswer
  ): FillInTheBlanksAnswerErrorsType {
    const answerBank = this.getAnswer();
    const errors = [];
    for (const blank in answer) {
      if (answerBank[blank] !== answer[blank]) {
        errors.push(blank);
      }
    }

    return { wrongBlanks: errors };
  }

  static getBlanksFromQuestion(question: string): string[] {
    return question.match(/\$\$.*?\$\$/g) || [];
  }

  //TODO Write tests for this!
  build() {
    const blanks = FillInTheBlanksActivity.getBlanksFromQuestion(
      this.getQuestion().text
    );
    const answerBank = this.getAnswer();
    const options = this.getOptions();
    const answerOptions = values(answerBank);

    // Check if all the blanks have an answer
    if (!every(blanks, (blank) => answerBank[blank]))
      throw new Error("Every blank needs to have an answer");

    // Check if all the answer options have greater than or equal to the number of of options
    const answerOptionsCount = countBy(answerOptions);
    const optionsCount = countBy(options);

    if (
      !every(
        answerOptionsCount,
        (answerOptionCount, answerOption) =>
          optionsCount[answerOption] >= answerOptionCount
      )
    ) {
      throw new Error(
        "The options should have all the options in the answer. Refresh the page and try again."
      );
    }

    return this.getData();
  }
}

export type FillInTheBlanksAnswerErrorsType = {
  wrongBlanks: string[];
};
