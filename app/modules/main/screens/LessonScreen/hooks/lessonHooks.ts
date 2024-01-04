import { useQuery } from '@tanstack/react-query';
import {
  getLessonActivities,
  GET_LESSON_ACTIVITIES,
  GET_LESSON,
  getLesson,
} from '@voxify/api/lms/lms';

export const useGetLesson = (lessonId: string) => {
  return useQuery({
    queryFn: getLesson.bind(null, lessonId),
    queryKey: [GET_LESSON, lessonId],
  });
};

export const useGetLessonActivities = (lessonId: string) => {
  return useQuery({
    queryFn: () => getLessonActivities(lessonId),
    queryKey: [GET_LESSON_ACTIVITIES, lessonId],
  });
};
