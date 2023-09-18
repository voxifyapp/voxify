import { Activity, ActivityType } from "./activity";
import { TextBlock } from "./blocks/text-block";

export interface FillInTheBlanksActivityData {
  question: TextBlock;
  options: TextBlock[];
  answer: Record<string, string>;
}

/**
 * The answer is a map of blank name to the option id
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
            options: data.options.map(
              (option) => new TextBlock(option.text, option)
            ),
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

  getOptions(): TextBlock[] {
    return this.getData().options;
  }

  setOptions(options: TextBlock[]): void {
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

  build() {
    return this.getData();
  }
}

export type FillInTheBlanksAnswerErrorsType = {
  wrongBlanks: string[];
};
