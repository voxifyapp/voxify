/* eslint-disable @typescript-eslint/no-empty-interface */
import { Activity } from './activity';
import { TextBlock } from './blocks/text-block';

export interface PronunciationActivityData {
  prompt: TextBlock;
}

export interface PronunciationActivityAnswer {}

export const ACTIVITY_TYPE_PRONUNCIATION = 'PRONUNCIATION';
export class PronunciationActivity extends Activity<
  PronunciationActivityData,
  PronunciationActivityAnswer
> {
  constructor(data?: PronunciationActivityData) {
    super(
      ACTIVITY_TYPE_PRONUNCIATION,
      data ? { ...data } : { prompt: new TextBlock('') },
    );
  }

  setPrompt(prompt: TextBlock): void {
    this.setData({ ...this.getData(), prompt });
  }

  getPrompt(): TextBlock {
    return this.getData().prompt;
  }

  //TODO Need to implement after finalizing the Speech to Text API
  checkAnswer() {
    return [];
  }
}
