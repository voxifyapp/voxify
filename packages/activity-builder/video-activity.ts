import { Activity, ActivityType } from "./activity";

export interface VideoActivityData {
  /**
   * File name of the video. We are using cloudfront to serve the videos
   * We'll be saving the file name only here 'example.mp4'
   * This gives us flexibility to create different versions of the video.
   * Do not include the extension of the video
   */
  videoFileName: string;
}

export interface VideoActivityAnswer {
  completionTime?: number;
}

export class VideoActivity extends Activity<
  VideoActivityData,
  VideoActivityAnswer
> {
  constructor(data?: VideoActivityData) {
    super(ActivityType.VIDEO, data || { videoFileName: "" });
  }

  public setVideoFileName(url: string): void {
    this.setData({ ...this.getData(), videoFileName: url });
  }

  public getVideoFileName(): string {
    return this.getData().videoFileName;
  }

  checkAnswer() {
    return [];
  }

  build() {
    return this.getData();
  }
}
