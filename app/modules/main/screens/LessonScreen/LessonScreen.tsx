import {
  GET_LESSON,
  GET_LESSON_ACTIVITIES,
  getLesson,
  getLessonActivities,
} from '@voxify/api/lms/lms';
import { ActivityStepper } from '@voxify/modules/main/screens/LessonScreen/components/ActivityStepper/ActivityStepper';
import React from 'react';
import { useQuery } from 'react-query';
import { H1, View } from 'tamagui';
import { slice } from 'lodash';

export const LessonScreen = () => {
  const lessonId = 'fdfb262e-cf99-4c31-84ed-574bb3f53241';
  const { isLoading: isLessonLoading } = useQuery({
    queryFn: getLesson.bind(null, lessonId),
    queryKey: [GET_LESSON, lessonId],
  });

  const { data: lessonActivities, isLoading: isLessonActivitiesLoading } =
    useQuery({
      queryFn: getLessonActivities.bind(null, lessonId),
      queryKey: [GET_LESSON_ACTIVITIES, lessonId],
    });

  if (isLessonLoading || isLessonActivitiesLoading) {
    return <H1>Loading...</H1>;
  }

  return (
    <View>
      <ActivityStepper activities={slice(lessonActivities!, 0)} />
    </View>
  );
};
