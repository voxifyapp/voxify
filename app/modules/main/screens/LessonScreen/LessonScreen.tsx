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
import {
  useCreateLessonResponse,
  useUpdateLessonResponse,
} from '@voxify/modules/main/screens/LessonScreen/components/hooks/useCreateLessonResponse';
import { useUnitSyncCompletion } from '@voxify/modules/main/screens/LessonScreen/components/hooks/useUnitSyncCompletion';
import { LessonSelect } from '@voxify/modules/staff/components/LessonSelect';
import { LessonResponseStatus } from '@voxify/types/lms-progress/lesson-response';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { H1 } from 'tamagui';

type Props = NativeStackScreenProps<AppStackParamList, 'Lesson'>;

export const lessonCompletionInfoAtom = atom<
  Map<
    string,
    {
      lessonResponseId: string;
      isCompleted: boolean;
    }
  >
>(new Map());

export const LessonScreen = ({ route }: Props) => {
  const params = route.params;

  const [lessonId, setLessonId] = useState(params.lessonId);
  const [unitId] = useState(params.unitId);
  useUnitSyncCompletion({ unitId });

  // const [profileProgress, completedUnits, markUnitCompleted] =
  //   useProfileProgressStore((state: ProgressState & ProgressActions) => [
  //     state.profileProgress,
  //     state.completedUnits,
  //     state.markUnitCompleted,
  //   ]);

  const lessonCompletionInfo = useAtomValue(lessonCompletionInfoAtom);
  const setLessonCompletionInfo = useSetAtom(lessonCompletionInfoAtom);
  const { isLoading: isLessonLoading } = useQuery({
    queryFn: getLesson.bind(null, lessonId),
    queryKey: [GET_LESSON, lessonId],
  });

  const { data: lessonActivities, isLoading: isLessonActivitiesLoading } =
    useQuery({
      queryFn: () => getLessonActivities(lessonId),
      queryKey: [GET_LESSON_ACTIVITIES, lessonId],
    });

  const { mutate, status: createLessonResponseMutationStatus } =
    useCreateLessonResponse();

  const isCreateLessonResponseLoading =
    createLessonResponseMutationStatus === 'pending';

  const { mutate: updateLessonResponseMutate } = useUpdateLessonResponse(
    lessonId,
    unitId,
  );

  // const { mutate: createUnitResponseMutate } = useCreateUnitResponse();

  useEffect(() => {
    !lessonCompletionInfo.has(lessonId) &&
      mutate(
        {
          status: LessonResponseStatus.STARTED,
          lessonId,
        },
        {
          onSuccess: data => {
            setLessonCompletionInfo(prev =>
              new Map(prev).set(lessonId, {
                lessonResponseId: data.id,
                isCompleted: false,
              }),
            );
          },
        },
      );
  }, [lessonId, mutate, lessonCompletionInfo, setLessonCompletionInfo]);

  // useEffect(() => {
  //   if (
  //     !completedUnits.has(unitId) &&
  //     profileProgress[unitId].filter(
  //       lesson =>
  //         lesson.lessonCompletionStatus !== LessonResponseStatus.COMPLETED,
  //     ).length === 0
  //   ) {
  //     markUnitCompleted(unitId);
  //     createUnitResponseMutate({ unitId });
  //   }
  // }, [
  //   completedUnits,
  //   createUnitResponseMutate,
  //   lessonId,
  //   markUnitCompleted,
  //   profileProgress,
  //   unitId,
  // ]);

  const handleLessonComplete = useCallback(() => {
    updateLessonResponseMutate({
      status: LessonResponseStatus.COMPLETED,
      lessonResponseId: lessonCompletionInfo.get(lessonId)?.lessonResponseId!,
    });
  }, [lessonCompletionInfo, lessonId, updateLessonResponseMutate]);

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
      {lessonActivities && (
        <ActivityStepper
          lessonId={lessonId}
          lessonResponseId={
            lessonCompletionInfo.get(lessonId)?.lessonResponseId!
          }
          onLessonComplete={handleLessonComplete}
          activities={lessonActivities}
        />
      )}
    </Screen>
  );
};
