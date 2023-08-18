import { TextBlock } from '../blocks/text-block';
import { MultipleChoiceActivity } from '../multiple-choice-activity';

describe('MultipleChoiceActivity', () => {
  it('create an empty fill in the blanks activity', () => {
    const activity = new MultipleChoiceActivity();
    expect(activity.getQuestion().text).toEqual('');
    expect(activity.getOptions().length).toEqual(0);
    expect(activity.getAnswer()).toEqual([]);
  });

  it('should be able to set question, options and answer', () => {
    const activity = new MultipleChoiceActivity();
    activity.setQuestion(new TextBlock('Question'));
    activity.setOptions([new TextBlock('Option 1'), new TextBlock('Option 2')]);
    activity.setAnswer([activity.getOptions()[0].id]);
    expect(activity.getQuestion().text).toEqual('Question');
    expect(activity.getOptions().length).toEqual(2);
    expect(activity.getAnswer()).toEqual([activity.getOptions()[0].id]);
  });

  it('should be able to create from existing data', () => {
    const activity = new MultipleChoiceActivity();
    activity.setQuestion(new TextBlock('Question'));
    activity.setOptions([new TextBlock('Option 1')]);
    activity.setAnswer([activity.getOptions()[0].id]);

    const activity2 = new MultipleChoiceActivity(
      JSON.parse(JSON.stringify(activity.getData())),
    );
    expect(activity.getQuestion().id).toEqual(activity2.getQuestion().id);
    expect(activity.getOptions()[0].id).toEqual(activity2.getOptions()[0].id);
    expect(activity.getAnswer()).toEqual(activity2.getAnswer());
  });

  it('should be able to return wrong options', () => {
    const activity = new MultipleChoiceActivity();
    activity.setOptions([new TextBlock('Option 1'), new TextBlock('Option 2')]);
    activity.setAnswer([activity.getOptions()[0].id]);

    expect(activity.checkAnswer([activity.getOptions()[1].id])).toEqual([
      activity.getOptions()[1].id,
    ]);
  });

  it('should return empty array if correct', () => {
    const activity = new MultipleChoiceActivity();
    activity.setOptions([new TextBlock('Option 1'), new TextBlock('Option 2')]);
    activity.setAnswer([activity.getOptions()[0].id]);

    expect(activity.checkAnswer([activity.getOptions()[0].id])).toEqual([]);
  });
});
