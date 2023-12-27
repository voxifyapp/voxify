import {
  GET_LESSON,
  GET_LESSON_ACTIVITIES,
  getLesson,
  getLessonActivities,
} from "@voxify/api/lms/lms";
import { Screen } from "@voxify/design_system/layout";

import { useQuery } from "@tanstack/react-query";
import { ActivityStepper } from "@voxify/app/(app)/lesson/components/ActivityStepper/ActivityStepper";
import {
  useCreateLessonResponse,
  useUpdateLessonResponse,
} from "@voxify/app/(app)/lesson/components/hooks/useCreateLessonResponse";
import { LessonResponseStatus } from "@voxify/types/lms-progress/lesson-response";
import { useLocalSearchParams } from "expo-router";
import { atom, useAtomValue, useSetAtom } from "jotai";
import React, { useCallback, useEffect } from "react";
import { H1 } from "tamagui";

type Props = {};

export const lessonCompletionInfoAtom = atom<
  Map<
    string,
    {
      lessonResponseId: string;
      isCompleted: boolean;
    }
  >
>(new Map());

export default function LessonScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  //   useUnitSyncCompletion({ unitId });

  // const [profileProgress, completedUnits, markUnitCompleted] =
  //   useProfileProgressStore((state: ProgressState & ProgressActions) => [
  //     state.profileProgress,
  //     state.completedUnits,
  //     state.markUnitCompleted,
  //   ]);

  const lessonCompletionInfo = useAtomValue(lessonCompletionInfoAtom);
  const setLessonCompletionInfo = useSetAtom(lessonCompletionInfoAtom);
  const { data: lesson, isLoading: isLessonLoading } = useQuery({
    queryFn: getLesson.bind(null, lessonId),
    queryKey: [GET_LESSON, lessonId],
  });

  const unitId = lesson?.unitId;

  const { data: lessonActivities, isLoading: isLessonActivitiesLoading } =
    useQuery({
      queryFn: () => getLessonActivities(lessonId),
      queryKey: [GET_LESSON_ACTIVITIES, lessonId],
    });

  const { mutate, status: createLessonResponseStatus } =
    useCreateLessonResponse();

  const isCreateLessonResponseLoading =
    createLessonResponseStatus === "pending";

  const { mutate: updateLessonResponseMutate } =
    useUpdateLessonResponse(lessonId);

  // const { mutate: createUnitResponseMutate } = useCreateUnitResponse();

  useEffect(() => {
    !lessonCompletionInfo.has(lessonId) &&
      mutate(
        {
          status: LessonResponseStatus.STARTED,
          lessonId,
        }
        // {
        //   onSuccess: (data) => {
        //     setLessonCompletionInfo((prev) =>
        //       new Map(prev).set(lessonId, {
        //         lessonResponseId: data.id,
        //         isCompleted: false,
        //       })
        //     );
        //   },
        // }
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
}
