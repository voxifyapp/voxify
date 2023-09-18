export declare abstract class Activity<T, U> {
    private data;
    private type;
    constructor(type: string, data: T);
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
