import { TextBlock } from '../blocks/text-block';
import { PronunciationActivity } from '../pronunciation-activity';

describe('PronunciationActivity', () => {
  it('create an empty activity', () => {
    const activity = new PronunciationActivity();
    expect(activity.getPrompt().text).toEqual('');
  });

  it('create activity from existing data', () => {
    const activity = new PronunciationActivity({
      prompt: new TextBlock('The sentence to pronounce'),
    });
    expect(
      new PronunciationActivity(
        JSON.parse(JSON.stringify(activity.getData())),
      ).getPrompt().id,
    ).toEqual(activity.getPrompt().id);
  });

  it('set prompt', () => {
    const activity = new PronunciationActivity();
    activity.setPrompt(new TextBlock('The sentence to pronounce'));
    expect(activity.getPrompt().text).toEqual('The sentence to pronounce');
  });
});
