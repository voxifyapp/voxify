import { FillInTheBlanks } from '@voxify/modules/main/components/ActivityRenderer/FillInTheBlanks/FillInTheBlanks';
import { FormASentence } from '@voxify/modules/main/components/ActivityRenderer/FormASentence/FormASentence';
import { MultipleChoice } from '@voxify/modules/main/components/ActivityRenderer/MultipleChoice/MultipleChoice';
import { Pronunciation } from '@voxify/modules/main/components/ActivityRenderer/Pronunciation/Pronunciation';
import { Video } from '@voxify/modules/main/components/ActivityRenderer/Video/Video';
import { Text } from '@voxify/modules/main/components/ActivityRenderer/Text/Text';
import {
  ActivityRendererMachineRestoreDataType,
  activityRendererMachine,
} from '@voxify/modules/main/components/ActivityRenderer/activityRenderer.machine';
import { ActivityEntity, ActivityType } from '@voxify/types/lms/lms';
import { createActorContext } from '@xstate/react';
import React, { useEffect, useMemo } from 'react';
import {
  FillInTheBlanksActivity,
  FormASentenceActivity,
  MultipleChoiceActivity,
  VideoActivity,
  PronunciationActivity,
  TextActivity,
} from '@packages/activity-builder';
import { ActivityResponseResultType } from '@voxify/types/lms-progress/activity-response';
import {
  ActivityRendererOnCompleteType,
  useCreateActivityRendererContext,
  ActivityRendererContextProvider,
  useActivityRendererContext,
} from '@voxify/modules/main/components/ActivityRenderer/activityRenderer.context';

type Props = {
  activityEntity: ActivityEntity;
  onActivityResults: ActivityRendererOnCompleteType;
  restoreData?: ActivityRendererMachineRestoreDataType;
  isActive: boolean;
  index?: number;
};

export const ActivityRendererMachineContext = createActorContext(
  activityRendererMachine,
);

// We are memoizing to not f with the virtualized list
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
      // We are disabling this because we don't want to restore any time restore data changes
      // It should only happen in the first mount
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [machineService]);

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
        state.event.type === 'set_result' &&
        state.changed
      ) {
        onActivityResults({
          result: state.context.result as ActivityResponseResultType,
          userAnswer: state.context.userAnswer,
          timeTakenToCompleteInSeconds:
            state.context.totalTimeSpentInMillis / 1000,
          answerError: state.context.answerError,
        });
      }
    }).unsubscribe;
  }, [machineService, onActivityResults]);

  //TODO Do this the right way later
  const ActivityComponent = useMemo(() => {
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

    if (activity.type === ActivityType.TEXT) {
      return (
        <Text
          activity={new TextActivity(activity.data as any)}
          heading={activity.heading}
        />
      );
    }
  }, [activity.data, activity.heading, activity.type]);

  return <>{ActivityComponent}</>;
};
