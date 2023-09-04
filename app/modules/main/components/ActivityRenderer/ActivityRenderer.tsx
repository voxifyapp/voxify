import { FillInTheBlanksActivity } from '@voxify/common/activities/fill-in-the-blanks-activity';
import { FormASentenceActivity } from '@voxify/common/activities/form-a-sentence-activity';
import { MultipleChoiceActivity } from '@voxify/common/activities/multiple-choice-activity';
import { PronunciationActivity } from '@voxify/common/activities/pronunciation-activity';
import { VideoActivity } from '@voxify/common/activities/video-activity';
import {
  ActivityRendererContextProvider,
  ActivityRendererOnCompleteType,
  useActivityRendererContext,
  useCreateActivityRendererContext,
} from '@voxify/modules/main/components/ActivityRenderer/ActivityRendererContext';
import { FillInTheBlanks } from '@voxify/modules/main/components/ActivityRenderer/FillInTheBlanks/FillInTheBlanks';
import { activityRendererMachine } from '@voxify/modules/main/components/ActivityRenderer/activityRendererMachine';
import { FormASentence } from '@voxify/modules/main/screens/LessonScreen/components/FormASentence';
import { MultipleChoice } from '@voxify/modules/main/screens/LessonScreen/components/MultipleChoice';
import { Pronunciation } from '@voxify/modules/main/screens/LessonScreen/components/Pronunciation/Pronunciation';
import { Video } from '@voxify/modules/main/screens/LessonScreen/components/Video';
import { ActivityEntity, ActivityType } from '@voxify/types/lms/lms';
import { createActorContext } from '@xstate/react';
import React, { useEffect } from 'react';

type Props = {
  activityEntity: ActivityEntity;
  onActivityResults: ActivityRendererOnCompleteType;
};

export const ActivityRendererMachineContext = createActorContext(
  activityRendererMachine,
);

export const ActivityRenderer = React.memo(
  ({ activityEntity, onActivityResults }: Props) => {
    const contextValue = useCreateActivityRendererContext({
      onActivityResults,
      activityEntity,
    });

    useEffect(() => {
      return () => {
        console.log('Unmounted', activityEntity.id);
      };
    }, [activityEntity]);

    return (
      <ActivityRendererMachineContext.Provider>
        <ActivityRendererContextProvider value={contextValue}>
          <ActivitySelector />
        </ActivityRendererContextProvider>
      </ActivityRendererMachineContext.Provider>
    );
  },
);

const ActivitySelector = () => {
  const { activityEntity: activity, onActivityResults } =
    useActivityRendererContext();

  const activityRendererActor = ActivityRendererMachineContext.useActorRef();

  useEffect(() => {
    return activityRendererActor.subscribe(state => {
      if (
        state.matches('WORKING_STATE.RESULT') &&
        state.event.type === 'set_result'
      ) {
        onActivityResults({
          result: state.context.result,
          data: state.context.userAnswer,
          timeTakenToCompleteInSeconds:
            state.context.totalTimeSpentInMillis / 1000,
        });
      }
    }).unsubscribe;
  }, [activityRendererActor, onActivityResults]);

  useEffect(() => {
    activityRendererActor.send({ type: 'FOCUSED' });
  }, [activityRendererActor]);

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
