import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { AppStackParamList } from '@voxify/App';
import {
  GET_LESSON,
  GET_LESSON_ACTIVITIES,
  getLesson,
  getLessonActivities,
} from '@voxify/api/lms/lms';
import { Screen } from '@voxify/design_system/layout';
import { ActivityStepper } from '@voxify/modules/main/screens/LessonScreen/components/ActivityStepper/ActivityStepper';
import {
  useCreateLessonResponse,
  useUpdateLessonResponse,
} from '@voxify/modules/main/screens/LessonScreen/components/hooks/useCreateLessonResponse';
import { LessonSelect } from '@voxify/modules/staff/components/LessonSelect';
import { LessonResponseStatus } from '@voxify/types/lms-progress/lesson-response';
import React, { useCallback, useEffect, useState } from 'react';
import { H1 } from 'tamagui';

type Props = NativeStackScreenProps<AppStackParamList, 'Lesson'>;

export const LessonScreen = ({ route }: Props) => {
  const params = route.params;

  const [lessonId, setLessonId] = useState(params.lessonId);

  const { isLoading: isGetLessonLoading } = useQuery({
    queryFn: getLesson.bind(null, lessonId),
    queryKey: [GET_LESSON, lessonId],
  });

  const { data: lessonActivities, isLoading: isLessonActivitiesLoading } =
    useQuery({
      queryFn: () => getLessonActivities(lessonId),
      queryKey: [GET_LESSON_ACTIVITIES, lessonId],
    });

  const {
    mutate: createLessonResponseMutate,
    status: createLessonResponseMutationStatus,
    data: createLessonResponseData,
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

  const handleLessonComplete = useCallback(() => {
    lessonResponseId &&
      updateLessonResponseMutate({
        status: LessonResponseStatus.COMPLETED,
        lessonResponseId,
      });
  }, [lessonResponseId, updateLessonResponseMutate]);

  if (
    isGetLessonLoading ||
    isLessonActivitiesLoading ||
    isCreateLessonResponseLoading
  ) {
    return <H1>Loading...</H1>;
  }

  return (
    <Screen noPadding>
      <LessonSelect onLessonSelected={_lessonId => setLessonId(_lessonId)} />
      {lessonActivities && lessonResponseId && (
        <ActivityStepper
          lessonId={lessonId}
          lessonResponseId={lessonResponseId}
          onLessonComplete={handleLessonComplete}
          activities={lessonActivities}
        />
      )}
    </Screen>
  );
};
