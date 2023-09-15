import { TextBlock } from '../blocks/text-block';
import { FillInTheBlanksActivity } from '../fill-in-the-blanks-activity';

describe('FillInTheBlanksActivity', () => {
  it('create an empty fill in the blanks activity', () => {
    const activity = new FillInTheBlanksActivity();
    expect(activity.getQuestion().text).toEqual('');
    expect(activity.getOptions().length).toEqual(0);
    expect(activity.getAnswer()).toEqual({});
  });

  it('should be able to set question, options and answer', () => {
    const activity = new FillInTheBlanksActivity();
    activity.setQuestion(new TextBlock('This i a $$blank1$$ day'));
    activity.setOptions([new TextBlock('Option 1'), new TextBlock('Option 2')]);
    activity.setAnswer({ blank1: activity.getOptions()[0].id });
    expect(activity.getQuestion().text).toEqual('This i a $$blank1$$ day');
    expect(activity.getOptions().length).toEqual(2);
    expect(activity.getAnswer()).toEqual({
      blank1: activity.getOptions()[0].id,
    });
  });

  it('should be able to create from existing data', () => {
    const activity = new FillInTheBlanksActivity();
    activity.setQuestion(new TextBlock('This is a $$blank1$$ day'));
    activity.setOptions([new TextBlock('Option 1')]);
    activity.setAnswer({ blank1: activity.getOptions()[0].id });

    const activity2 = new FillInTheBlanksActivity(
      JSON.parse(JSON.stringify(activity.getData())),
    );
    expect(activity.getQuestion().id).toEqual(activity2.getQuestion().id);
    expect(activity.getOptions()[0].id).toEqual(activity2.getOptions()[0].id);
    expect(activity.getAnswer()).toEqual(activity2.getAnswer());
  });

  it('should be able to return wrong blanks', () => {
    const activity = new FillInTheBlanksActivity();
    activity.setQuestion(new TextBlock('This is a $$blank1$$ day'));
    activity.setOptions([new TextBlock('Option 1'), new TextBlock('Option 2')]);
    activity.setAnswer({ $$blank1$$: activity.getOptions()[0].id });

    expect(
      activity.checkAnswer({ $$blank1$$: activity.getOptions()[1].id }),
    ).toEqual(expect.objectContaining({ wrongBlanks: ['$$blank1$$'] }));
  });

  it('should return empty array if correct', () => {
    const activity = new FillInTheBlanksActivity();
    activity.setQuestion(new TextBlock('This is a $$blank1$$ day'));
    activity.setOptions([new TextBlock('Option 1'), new TextBlock('Option 2')]);
    activity.setAnswer({ $$blank1$$: activity.getOptions()[0].id });

    expect(
      activity.checkAnswer({ $$blank1$$: activity.getOptions()[0].id }),
    ).toEqual(expect.objectContaining({ wrongBlanks: [] }));
  });
});
