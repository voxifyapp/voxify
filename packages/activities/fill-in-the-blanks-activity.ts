import { Activity } from './activity';
import { TextBlock } from './blocks/text-block';

export interface FillInTheBlanksActivityData {
  question: TextBlock;
  options: TextBlock[];
  answer: Record<string, string>;
}

export type FillInTheBlanksActivityAnswer = Record<string, string>;

export const ACTIVITY_TYPE_FILL_IN_THE_BLANKS = 'FILL_IN_THE_BLANKS';

export class FillInTheBlanksActivity extends Activity<
  FillInTheBlanksActivityData,
  FillInTheBlanksActivityAnswer
> {
  constructor(data?: FillInTheBlanksActivityData) {
    super(
      ACTIVITY_TYPE_FILL_IN_THE_BLANKS,
      data
        ? {
            ...data,
            question: new TextBlock(data.question.text, data.question),
            options: data.options.map(
              (option) => new TextBlock(option.text, option),
            ),
          }
        : { question: new TextBlock(''), options: [], answer: {} },
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

  setAnswer(answer: Record<string, string>): void {
    this.setData({ ...this.getData(), answer });
  }

  /**
   * Returns blanks that are incorrect, else returns nothing
   */
  checkAnswer(answer: FillInTheBlanksActivityAnswer) {
    const answerBank = this.getAnswer();
    const errors = [];
    for (const blank in answer) {
      if (answerBank[blank] !== answer[blank]) {
        errors.push(blank);
      }
    }

    return errors;
  }
}
