import {
  FormASentenceActivity,
  FormASentenceActivityAnswer,
  FormASentenceAnswerErrorType,
} from '@voxify/common/activities/form-a-sentence-activity';
import { createCtx } from '@voxify/common/utils/contextUtils';
import { useActivityRendererContext } from '@voxify/modules/main/components/ActivityRenderer/ActivityRendererContext';
import { useState } from 'react';

type ContextData = {
  activity: FormASentenceActivity;
};

export function useCreateFormASentenceContext({ activity }: ContextData) {
  const { machineService: activityRendererMachineService } =
    useActivityRendererContext();

  const [userAnswer, setUserAnswer] = useState<FormASentenceActivityAnswer>({
    answer: [],
  });
  const [answerErrors, setAnswerErrors] =
    useState<FormASentenceAnswerErrorType | null>(null);

  const isWorkingStateAnd = (condition: boolean) => {
    return (
      condition &&
      activityRendererMachineService
        .getSnapshot()
        .matches('WORKING_STATE.WORKING')
    );
  };

  const words = activity.getWords();
  const wordBank = [...words];
  userAnswer.answer.forEach(word => {
    const index = wordBank.indexOf(word);
    if (index !== -1) {
      wordBank.splice(index, 1);
    }
  });

  return {
    activity,
    setUserAnswer,
    userAnswer,
    setAnswerErrors,
    answerErrors,
    wordBank,
    removeWord: (index: number) => {
      setUserAnswer(prev => {
        const newAnswer = [...prev.answer];
        newAnswer.splice(index, 1);
        return {
          answer: newAnswer,
        };
      });
    },
    addWord: (word: string) => {
      setUserAnswer(prev => ({ answer: [...prev.answer, word] }));
    },
    isWorkingState: isWorkingStateAnd(true),
  };
}

export const [
  useFormASentenceContext,
  FormASentenceContextProvider,
  FormASentenceContextConsumer,
] = createCtx<ReturnType<typeof useCreateFormASentenceContext>>();
