import {
  ActivityRendererContextProvider,
  ActivityRendererOnCompleteType,
  useActivityRendererContext,
  useCreateActivityRendererContext,
} from '@voxify/modules/main/components/ActivityRenderer/activityRenderer.context';
import { FillInTheBlanks } from '@voxify/modules/main/components/ActivityRenderer/FillInTheBlanks/FillInTheBlanks';
import {
  ActivityRendererMachineRestoreDataType,
  activityRendererMachine,
} from '@voxify/modules/main/components/ActivityRenderer/activityRenderer.machine';
import { FormASentence } from '@voxify/modules/main/screens/LessonScreen/components/FormASentence';
import { MultipleChoice } from '@voxify/modules/main/screens/LessonScreen/components/MultipleChoice';
import { Pronunciation } from '@voxify/modules/main/screens/LessonScreen/components/Pronunciation/Pronunciation';
import { Video } from '@voxify/modules/main/screens/LessonScreen/components/Video';
import { ActivityEntity, ActivityType } from '@voxify/types/lms/lms';
import { createActorContext } from '@xstate/react';
import React, { useEffect } from 'react';
import {
  FillInTheBlanksActivity,
  FormASentenceActivity,
  MultipleChoiceActivity,
  VideoActivity,
  PronunciationActivity,
} from '@packages/activity-builder';

type Props = {
  activityEntity: ActivityEntity;
  onActivityResults: ActivityRendererOnCompleteType;
  restoreData?: ActivityRendererMachineRestoreDataType;
  isActive: boolean;
};

export const ActivityRendererMachineContext = createActorContext(
  activityRendererMachine,
);

export const ActivityRenderer = React.memo(
  ({ activityEntity, onActivityResults, restoreData, isActive }: Props) => {
    const contextValue = useCreateActivityRendererContext({
      onActivityResults,
      activityEntity,
      restoreData,
    });

    const { machineService } = contextValue;

    useEffect(() => {
      if (restoreData) {
        machineService.send({ type: 'RESTORE_DATA', restoreData });
      }
    }, [machineService, restoreData]);

    useEffect(() => {
      machineService.send({ type: isActive ? 'FOCUSED' : 'UNFOCUSED' });
    }, [isActive, machineService]);

    return (
      <ActivityRendererContextProvider value={contextValue}>
        <ActivitySelector />
      </ActivityRendererContextProvider>
    );
  },
);

const ActivitySelector = () => {
  const {
    activityEntity: activity,
    machineService,
    onActivityResults,
  } = useActivityRendererContext();

  // If there was a 'set_result' event which led to the 'WORKING_STATE.RESULT' let's invoke the callback
  useEffect(() => {
    return machineService.subscribe(state => {
      if (
        state.matches('WORKING_STATE.RESULT') &&
        state.event.type === 'set_result'
      ) {
        onActivityResults({
          result: state.context.result,
          userAnswer: state.context.userAnswer,
          timeTakenToCompleteInSeconds:
            state.context.totalTimeSpentInMillis / 1000,
          answerError: state.context.answerError,
        });
      }
    }).unsubscribe;
  }, [machineService, onActivityResults]);

  if (activity.type === ActivityType.FILL_IN_THE_BLANKS) {
    return (
      <FillInTheBlanks
        activity={new FillInTheBlanksActivity(activity.data as any)}
      />
    );
  }

  if (activity.type === ActivityType.FORM_A_SENTENCE) {
    return (
      <FormASentence
        activity={new FormASentenceActivity(activity.data as any)}
      />
    );
  }

  if (activity.type === ActivityType.MULTIPLE_CHOICE) {
    return (
      <MultipleChoice
        activity={new MultipleChoiceActivity(activity.data as any)}
      />
    );
  }

  if (activity.type === ActivityType.VIDEO) {
    return <Video activity={new VideoActivity(activity.data as any)} />;
  }

  if (activity.type === ActivityType.PRONUNCIATION) {
    return (
      <Pronunciation
        activity={new PronunciationActivity(activity.data as any)}
      />
    );
  }
};
