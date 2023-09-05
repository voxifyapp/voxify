import {
  FormASentenceActivity,
  FormASentenceActivityAnswer,
  FormASentenceAnswerErrorType,
} from '@voxify/common/activities/form-a-sentence-activity';
import { createCtx } from '@voxify/common/utils/contextUtils';
import { useGetActivityRendererHookExtras } from '@voxify/modules/main/components/ActivityRenderer/common/useGetActivityRendererHookExtras';
type ContextData = {
  activity: FormASentenceActivity;
};

export function useCreateFormASentenceContext({ activity }: ContextData) {
  const {
    userAnswer,
    setUserAnswer,
    answerErrors,
    setAnswerErrors,
    isWorkingStateAnd,
  } = useGetActivityRendererHookExtras<
    FormASentenceActivityAnswer,
    FormASentenceAnswerErrorType
  >({ answer: [] });

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
