import { ACTIVITY_TYPE_VIDEO, VideoActivity } from '../video-activity';

describe('VideoActivity', () => {
  it('create an empty video activity', () => {
    const activity = new VideoActivity();
    expect(activity.getVideoUrl()).toEqual('');
  });

  it('create a video activity from existing data', () => {
    const activity = new VideoActivity({
      videoUrl: 'https://www.youtube.com/watch?v=1',
    });
    expect(activity.getVideoUrl()).toEqual('https://www.youtube.com/watch?v=1');
  });

  it('set video url', () => {
    const activity = new VideoActivity();
    activity.setVideoUrl('https://www.youtube.com/watch?v=1');
    expect(activity.getVideoUrl()).toEqual('https://www.youtube.com/watch?v=1');
  });

  it('get data should return VIDEO type', () => {
    const activity = new VideoActivity({
      videoUrl: 'https://www.youtube.com/watch?v=1',
    });
    expect(activity.getData().type).toEqual(ACTIVITY_TYPE_VIDEO);
  });

  it('check answer always returns empty errors', () => {
    const activity = new VideoActivity({
      videoUrl: 'https://www.youtube.com/watch?v=1',
    });
    expect(activity.checkAnswer()).toEqual({});
  });
});
