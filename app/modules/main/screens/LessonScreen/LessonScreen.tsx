import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '@voxify/App';
import {
  GET_LESSON,
  GET_LESSON_ACTIVITIES,
  getLesson,
  getLessonActivities,
} from '@voxify/api/lms/lms';
import { Screen } from '@voxify/design_system/layout';
import { ActivityStepper } from '@voxify/modules/main/screens/LessonScreen/components/ActivityStepper/ActivityStepper';
import { useCreateLessonResponse } from '@voxify/modules/main/screens/LessonScreen/components/hooks/useCreateLessonResponse';
import { LessonSelect } from '@voxify/modules/staff/components/LessonSelect';
import {
  LessonResponseEntity,
  LessonResponseStatus,
} from '@voxify/types/lms-progress/lesson-response';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { H1 } from 'tamagui';

type Props = NativeStackScreenProps<AppStackParamList, 'Lesson'>;
export const LessonScreen = React.memo(({ route }: Props) => {
  const params = route.params;

  const [lessonId, setLessonId] = useState(params.lessonId);
  const [lessonResponseId, setLessonResponseId] = useState('');
  const { isLoading: isLessonLoading } = useQuery({
    queryFn: getLesson.bind(null, lessonId),
    queryKey: [GET_LESSON, lessonId],
  });

  const { data: lessonActivities, isLoading: isLessonActivitiesLoading } =
    useQuery({
      queryFn: () => getLessonActivities(lessonId),
      queryKey: [GET_LESSON_ACTIVITIES, lessonId],
    });

  const { mutate, isLoading: isCreateLessonResponseLoading } =
    useCreateLessonResponse();

  useEffect(() => {
    mutate(
      {
        status: LessonResponseStatus.STARTED,
        lessonId,
      },
      {
        onSuccess: (data: LessonResponseEntity) => {
          setLessonResponseId(data.id);
        },
      },
    );
  }, [lessonId, setLessonResponseId, mutate]);

  if (
    isLessonLoading ||
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
          lessonResponseId={lessonResponseId}
          activities={lessonActivities}
        />
      )}
    </Screen>
  );
});
