import { Activity } from "./activity";

export class FillInTheBlanksActivity extends Activity {
    constructor(data?: object) {
        super("FILL_IN_THE_BLANKS", data);
    }

    checkAnswer(answer: object): boolean {
        throw new Error("Method not implemented.");
    }
}