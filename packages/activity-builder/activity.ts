export enum ActivityType {
  VIDEO = "VIDEO",
  FILL_IN_THE_BLANKS = "FILL_IN_THE_BLANKS",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  PRONUNCIATION = "PRONUNCIATION",
  FORM_A_SENTENCE = "FORM_A_SENTENCE",
  TEXT = "TEXT",
}

export abstract class Activity<T, U> {
  private data: T;
  private type: ActivityType;

  constructor(type: ActivityType, data: T) {
    this.type = type;
    this.data = data;
  }

  /**
   * Returns the JSON representation of the activity. Save this to the database
   */
  public getData(): T & { type: string } {
    return { ...this.data, type: this.type };
  }

  public setData(data: T): void {
    this.data = data;
  }

  /**
   * Does all the necessary validation and builds the activity to a serializable format.
   */
  abstract build(): T & { type: string };

  /**
   * Checks if the answer is correct, returns an object specific to the activity if not
   */
  abstract checkAnswer(answer: U): any;
}
