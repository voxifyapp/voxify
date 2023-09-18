export declare enum ActivityType {
    VIDEO = "VIDEO",
    FILL_IN_THE_BLANKS = "FILL_IN_THE_BLANKS",
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
    PRONUNCIATION = "PRONUNCIATION",
    FORM_A_SENTENCE = "FORM_A_SENTENCE"
}
export declare abstract class Activity<T, U> {
    private data;
    private type;
    constructor(type: ActivityType, data: T);
    /**
     * Returns the JSON representation of the activity. Save this to the database
     */
    getData(): T & {
        type: string;
    };
    setData(data: T): void;
    /**
     * Does all the necessary validation and builds the activity to a serializable format.
     */
    abstract build(): T & {
        type: string;
    };
    /**
     * Checks if the answer is correct, returns an object specific to the activity if not
     */
    abstract checkAnswer(answer: U): any;
}
