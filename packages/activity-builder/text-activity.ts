import { Activity, ActivityType } from "./activity";
import { TextBlock } from "./blocks/text-block";

export interface TextActivityData {
  title: TextBlock;
  description: TextBlock;
}

export interface TextActivityAnswer {}

export class TextActivity extends Activity<
  TextActivityData,
  TextActivityAnswer
> {
  constructor(data?: TextActivityData) {
    super(
      ActivityType.TEXT,
      data
        ? {
            ...data,
            title: new TextBlock(data.title.text, data.title),
            description: new TextBlock(data.title.text, data.title),
          }
        : { title: new TextBlock(""), description: new TextBlock("") }
    );
  }

  setTitle(title: TextBlock): void {
    this.setData({ ...this.getData(), title });
  }

  getTitle(): TextBlock {
    return this.getData().title;
  }

  setDescription(description: TextBlock): void {
    this.setData({ ...this.getData(), description });
  }

  getDescription(): TextBlock {
    return this.getData().description;
  }

  checkAnswer() {
    return [];
  }

  build() {
    return this.getData();
  }
}
