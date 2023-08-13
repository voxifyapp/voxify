import { Activity } from "./activity";
import { TextBlock } from "./blocks/text-block";

export interface FillInTheBlanksActivityData {
    question: TextBlock;
    options: TextBlock[];
    answer: Record<string, number>
}

export interface FillInTheBlanksActivityAnswer {
}

export const ACTIVITY_TYPE_FILL_IN_THE_BLANKS = "FILL_IN_THE_BLANKS";

export class FillInTheBlanksActivity extends Activity<FillInTheBlanksActivityData, FillInTheBlanksActivityAnswer> {
    constructor(data?: FillInTheBlanksActivityData) {
        super(ACTIVITY_TYPE_FILL_IN_THE_BLANKS, data || {question: new TextBlock(""), options: [], answer: {}});
    }

    setQuestion(question: TextBlock): void {
        this.setData({...this.getData(), question});
    }

    getQuestion(): TextBlock {
        return this.getData().question;
    }

    getOptions(): TextBlock[] {
        return this.getData().options;
    }

    setOptions(options: TextBlock[]): void {
        this.setData({...this.getData(), options});
    }

    getAnswer() {
        return this.getData().answer;
    }

    setAnswer(answer: Record<string, number>): void {
        this.setData({...this.getData(), answer});
    }

    checkAnswer(answer: object): boolean {
        throw new Error("Method not implemented.");
    }
}