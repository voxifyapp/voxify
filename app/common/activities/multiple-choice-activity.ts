import { Activity } from './activity';
import { TextBlock } from './blocks/text-block';

export interface MultipleChoiceActivityData {
  question: TextBlock;
  options: TextBlock[];
  /**
   * Id of the answer, multiple answers are allowed
   */
  answer: string[];
}

export type MultipleChoiceActivityAnswer = string[];

export const ACTIVITY_TYPE_MULTIPLE_CHOICE = 'MULTIPLE_CHOICE';

export class MultipleChoiceActivity extends Activity<
  MultipleChoiceActivityData,
  MultipleChoiceActivityAnswer
> {
  constructor(data?: MultipleChoiceActivityData) {
    super(
      ACTIVITY_TYPE_MULTIPLE_CHOICE,
      data
        ? {
            ...data,
            question: new TextBlock(data.question.text, data.question),
            options: data.options.map((o) => new TextBlock(o.text, o)),
          }
        : { question: new TextBlock(''), options: [], answer: [] },
    );
  }

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

  setAnswer(answer: string[]): void {
    this.setData({ ...this.getData(), answer });
  }

  /**
   * Returns options that are incorrect, else returns nothing
   */
  checkAnswer(answer: MultipleChoiceActivityAnswer) {
    const answerBank = this.getAnswer();
    const errors = [];
    for (const selectedOption of answer) {
      if (answerBank.indexOf(selectedOption) === -1) {
        errors.push(selectedOption);
      }
    }

    return errors;
  }
}
