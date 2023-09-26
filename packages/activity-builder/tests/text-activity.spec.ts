import { TextBlock } from '../blocks/text-block';
import { TextActivity } from '../text-activity';

describe('TextActivity', () => {
  it('create an empty activity', () => {
    const activity = new TextActivity();
    expect(activity.getTitle().text).toEqual('');
    expect(activity.getDescription().text).toEqual('');
  });

  it('create activity from existing data', () => {
    const activity = new TextActivity({
      title: new TextBlock('Title of the text activity'),
      description: new TextBlock('Description of the text activity'),
    });
    expect(
      new TextActivity(
        JSON.parse(JSON.stringify(activity.getData())),
      ).getTitle().id,
    ).toEqual(activity.getTitle().id);
    expect(
        new TextActivity(
          JSON.parse(JSON.stringify(activity.getData())),
        ).getDescription().id,
      ).toEqual(activity.getDescription().id);
  });

  it('set prompt', () => {
    const activity = new TextActivity();
    activity.setTitle(new TextBlock('Title of the text activity'));
    activity.setDescription(new TextBlock('Description of the text activity'));
    expect(activity.getTitle().text).toEqual('Title of the text activity');
    expect(activity.getDescription().text).toEqual('Description of the text activity');
  });
});
