export abstract class Activity<T, U> {
  private data: T;
  private type: string;

  constructor(type: string, data: T) {
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
