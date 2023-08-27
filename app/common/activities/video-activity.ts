import { Activity } from './activity';

export interface VideoActivityData {
  videoUrl: string;
}

export interface VideoActivityAnswer {
  completionTime?: number;
}

export const ACTIVITY_TYPE_VIDEO = 'VIDEO';
export class VideoActivity extends Activity<
  VideoActivityData,
  VideoActivityAnswer
> {
  constructor(data?: VideoActivityData) {
    super(ACTIVITY_TYPE_VIDEO, data || { videoUrl: '' });
  }

  public setVideoUrl(url: string): void {
    this.setData({ ...this.getData(), videoUrl: url });
  }

  public getVideoUrl(): string {
    return this.getData().videoUrl;
  }

  checkAnswer() {
    return [];
  }

  build() {
    return this.getData();
  }
}
