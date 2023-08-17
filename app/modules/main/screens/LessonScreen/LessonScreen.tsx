import {
  GET_LESSON_WITH_ACTIVITIES,
  getLessonWithActivities,
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
  const { data: lessonData, isLoading } = useQuery({
    queryFn: getLessonWithActivities.bind(null, lessonId),
    queryKey: [GET_LESSON_WITH_ACTIVITIES, lessonId],
  });

  console.log(lessonData);

  if (isLoading) {
    return <H1>Loading...</H1>;
  }

  return <H1>Lesson Screen</H1>;
};
