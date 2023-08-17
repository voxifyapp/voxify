import {
  GET_LESSON,
  GET_LESSON_ACTIVITIES,
  getLesson,
  getLessonActivities,
} from '@voxify/api/lms/lms';
import React from 'react';
import { useQuery } from 'react-query';
import { H1 } from 'tamagui';

type Props = {
  lessonId: string;
};

export const LessonScreen = ({
  lessonId = 'fdfb262e-cf99-4c31-84ed-574bb3f53241',
}: Props) => {
  const { isLoading: isLessonLoading } = useQuery({
    queryFn: getLesson.bind(null, lessonId),
    queryKey: [GET_LESSON, lessonId],
  });

  const { data: lessonActivities, isLoading: isLessonActivitiesLoading } =
    useQuery({
      queryFn: getLessonActivities.bind(null, lessonId),
      queryKey: [GET_LESSON_ACTIVITIES, lessonId],
    });

  console.log(lessonActivities);

  if (isLessonLoading || isLessonActivitiesLoading) {
    return <H1>Loading...</H1>;
  }

  return <H1>Lesson Screen</H1>;
};
