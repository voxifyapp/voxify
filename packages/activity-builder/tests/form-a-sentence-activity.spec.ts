import { TextBlock } from '../blocks/text-block';
import { FormASentenceActivity } from '../form-a-sentence-activity';

describe('FormASentenceActivity', () => {
  let activity: FormASentenceActivity;

  beforeEach(() => {
    activity = new FormASentenceActivity({
      prompt: new TextBlock('Form a sentence using the following words:'),
      answer: [
        'The',
        'quick',
        'brown',
        'fox',
        'jumps',
        'over',
        'the',
        'lazy',
        'dog.',
      ],
      words: [
        'The',
        'quick',
        'brown',
        'fox',
        'jumps',
        'over',
        'the',
        'lazy',
        'dog.',
      ],
    });
  });

  it('should set and get prompt', () => {
    const prompt = new TextBlock('Form a sentence using the words below:');
    activity.setPrompt(prompt);
    expect(activity.getPrompt()).toEqual(prompt);
  });

  it('should set and get answer', () => {
    const answer = [
      'The',
      'lazy',
      'dog',
      'jumps',
      'over',
      'the',
      'quick',
      'brown',
      'fox.',
    ];
    activity.setAnswer(answer);
    expect(activity.getAnswer()).toEqual(answer);
  });

  it('should set and get words', () => {
    const words = [
      'The',
      'quick',
      'brown',
      'fox',
      'jumps',
      'over',
      'the',
      'lazy',
      'dog.',
    ];
    activity.setWords(words);
    expect(activity.getWords()).toEqual(words);
  });

  it('should check answer and return empty array if correct', () => {
    const answer = {
      answer: [
        'The',
        'quick',
        'brown',
        'fox',
        'jumps',
        'over',
        'the',
        'lazy',
        'dog.',
      ],
    };
    expect(activity.checkAnswer(answer)).toEqual({ correct: true });
  });

  it('should check answer and return {correct: false} if incorrect', () => {
    const answer = {
      answer: [
        'The',
        'quick',
        'brown',
        'fox',
        'jumps',
        'over',
        'the',
        'lazy',
        'cat.',
      ],
    };
    expect(activity.checkAnswer(answer)).toEqual({ correct: false });
  });

  it('should check answer and return correct false if length is different', () => {
    const answer = {
      answer: ['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy'],
    };
    expect(activity.checkAnswer(answer)).toEqual({ correct: false });
  });
});
