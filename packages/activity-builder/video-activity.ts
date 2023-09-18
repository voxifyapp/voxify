import { Activity, ActivityType } from "./activity";

export interface VideoActivityData {
  videoUrl: string;
}

export interface VideoActivityAnswer {
  completionTime?: number;
}

export class VideoActivity extends Activity<
  VideoActivityData,
  VideoActivityAnswer
> {
  constructor(data?: VideoActivityData) {
    super(ActivityType.VIDEO, data || { videoUrl: "" });
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
