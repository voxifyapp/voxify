import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '@voxify/App';
import { LoadingWithErrorContainer } from '@voxify/common/components/LoadingWithErrorContainer';
import { Screen } from '@voxify/design_system/layout';
import { ActivityStepper } from '@voxify/modules/main/screens/LessonScreen/components/ActivityStepper/ActivityStepper';
import {
  useGetLesson,
  useGetLessonActivities,
} from '@voxify/modules/main/screens/LessonScreen/hooks/lessonHooks';
import { LessonSelect } from '@voxify/modules/staff/components/LessonSelect';
import { LessonResponseStatus } from '@voxify/types/lms-progress/lesson-response';
import React, { useCallback, useEffect, useState } from 'react';
import {
  useCreateLessonResponse,
  useUpdateLessonResponse,
} from './hooks/useCreateLessonResponse';

type Props = NativeStackScreenProps<AppStackParamList, 'Lesson'>;

export const LessonScreen = ({ route }: Props) => {
  const params = route.params;

  const [lessonId, setLessonId] = useState(params.lessonId);

  const { isLoading: isGetLessonLoading, error: getLessonError } =
    useGetLesson(lessonId);
  const {
    data: lessonActivities,
    isLoading: isLessonActivitiesLoading,
    error: getLessonActivitiesError,
  } = useGetLessonActivities(lessonId);

  const {
    mutate: createLessonResponseMutate,
    status: createLessonResponseMutationStatus,
    data: createLessonResponseData,
    error: createLessonResponseError,
  } = useCreateLessonResponse();

  const lessonResponseId = createLessonResponseData?.id;

  const isCreateLessonResponseLoading =
    createLessonResponseMutationStatus === 'pending';

  const { mutate: updateLessonResponseMutate } =
    useUpdateLessonResponse(lessonId);

  // Create a new lesson response whenever the screen opens
  useEffect(() => {
    if (!lessonResponseId) {
      createLessonResponseMutate({
        status: LessonResponseStatus.STARTED,
        lessonId,
      });
    }
  }, [lessonId, createLessonResponseMutate, lessonResponseId]);

  // Mark lesson response as completed when lesson is completed
  const handleLessonComplete = useCallback(() => {
    lessonResponseId &&
      updateLessonResponseMutate({
        status: LessonResponseStatus.COMPLETED,
        lessonResponseId,
      });
  }, [lessonResponseId, updateLessonResponseMutate]);

  return (
    <Screen noPadding>
      <LoadingWithErrorContainer
        error={
          createLessonResponseError ||
          getLessonError ||
          getLessonActivitiesError
        }
        isLoading={
          isGetLessonLoading ||
          isLessonActivitiesLoading ||
          isCreateLessonResponseLoading
        }>
        <LessonSelect onLessonSelected={_lessonId => setLessonId(_lessonId)} />
        {lessonActivities && lessonResponseId && (
          <ActivityStepper
            lessonId={lessonId}
            lessonResponseId={lessonResponseId}
            onLessonComplete={handleLessonComplete}
            activities={lessonActivities}
          />
        )}
      </LoadingWithErrorContainer>
    </Screen>
  );
};
