import { ActivityType } from "../activity";
import { VideoActivity } from "../video-activity";

describe("VideoActivity", () => {
  it("create an empty video activity", () => {
    const activity = new VideoActivity();
    expect(activity.getVideoFileName()).toEqual("");
  });

  it("create a video activity from existing data", () => {
    const activity = new VideoActivity({
      videoFileName: "https://www.youtube.com/watch?v=1",
    });
    expect(activity.getVideoFileName()).toEqual(
      "https://www.youtube.com/watch?v=1"
    );
  });

  it("set video url", () => {
    const activity = new VideoActivity();
    activity.setVideoFileName("https://www.youtube.com/watch?v=1");
    expect(activity.getVideoFileName()).toEqual(
      "https://www.youtube.com/watch?v=1"
    );
  });

  it("get data should return VIDEO type", () => {
    const activity = new VideoActivity({
      videoFileName: "https://www.youtube.com/watch?v=1",
    });
    expect(activity.getData().type).toEqual(ActivityType.VIDEO);
  });

  it("check answer always returns empty errors", () => {
    const activity = new VideoActivity({
      videoFileName: "https://www.youtube.com/watch?v=1",
    });
    expect(activity.checkAnswer()).toEqual([]);
  });
});
