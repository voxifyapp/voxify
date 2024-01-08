import { every, includes } from "lodash";
import { Activity, ActivityType } from "./activity";
import { TextBlock } from "./blocks/text-block";

export interface MultipleChoiceActivityData {
  question: TextBlock;
  options: TextBlock[];
  /** Does the activity have more than 1 answer? */
  isMultipleAnswer: boolean;
  /**
   * Id of the answer, multiple answers are allowed
   */
  answer: string[];
}

export type MultipleChoiceActivityAnswer = { answer: string[] };

export class MultipleChoiceActivity extends Activity<
  MultipleChoiceActivityData,
  MultipleChoiceActivityAnswer
> {
  constructor(data?: MultipleChoiceActivityData) {
    super(
      ActivityType.MULTIPLE_CHOICE,
      data
        ? {
            ...data,
            question: new TextBlock(data.question.text, data.question),
            options: data.options.map((o) => new TextBlock(o.text, o)),
          }
        : {
            question: new TextBlock(""),
            options: [],
            answer: [],
            isMultipleAnswer: false,
          }
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

  getIsMultipleAnswer() {
    return this.getData().isMultipleAnswer;
  }

  setIsMultipleAnswer(isMultipleAnswer: boolean) {
    this.setData({ ...this.getData(), isMultipleAnswer });
  }

  setAnswer(answer: string[]): void {
    this.setData({ ...this.getData(), answer });
  }

  /**
   * Returns options that are incorrect, else returns nothing
   * TODO: Add unit tests for multiple cases: 1. Correct answer, 2. Incorrect answer, 3. Partially correct answer
   */
  checkAnswer(
    userAnswer: MultipleChoiceActivityAnswer
  ): MultipleChoiceAnswerErrorsType {
    const answerBank = this.getAnswer();
    const wrongOptions = new Set<string>([]);

    for (const answerFromBank of answerBank) {
      if (userAnswer.answer.indexOf(answerFromBank) === -1) {
        wrongOptions.add(answerFromBank);
      }
    }

    return { wrongOptions: Array.from(wrongOptions) };
  }

  build() {
    //TODO Add unit tests
    if (
      !every(this.getAnswer(), (answer) =>
        includes(
          this.getOptions().map((option) => option.id),
          answer
        )
      )
    )
      throw new Error("Answers ids need to be subset of options");

    if (this.getAnswer().length === 0) {
      throw new Error("At least one answer is required");
    }

    return this.getData();
  }
}

export type MultipleChoiceAnswerErrorsType = {
  wrongOptions: string[];
};
