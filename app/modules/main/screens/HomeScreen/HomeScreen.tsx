import { useQuery } from '@tanstack/react-query';
import {
  GET_UNITS_WITH_LESSON_COMPLETION,
  getUnitsWithLessonCompletion,
} from '@voxify/api/lms-progress/lesson-response';
import React, { useEffect, useRef } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { H1 } from 'tamagui';

import { UnitWithAssociatedLessons } from '@voxify/types/lms-progress/profile-progress';

import {
  GET_COURSE_FOR_PROFILE,
  getCourseForProfile,
} from '@voxify/api/auth/profile';
import {
  GET_UNIT_RESPONSE,
  getUnitResponse,
} from '@voxify/api/lms-progress/unit-response';
import { Screen } from '@voxify/design_system/layout';
import { UnitItem } from '@voxify/modules/main/screens/HomeScreen/components/UnitItem';
import {
  ProgressActions,
  ProgressState,
  useProfileProgressStore,
} from '@voxify/modules/main/screens/useProfileProgressStore';

type Props = {
  navigation: {
    navigate: Function;
  };
};

export const HomeScreen = ({}: Props) => {
  const [setProfileProgress, completedUnits, setCompletedUnits] =
    useProfileProgressStore((state: ProgressState & ProgressActions) => [
      state.setProfileProgress,
      state.completedUnits,
      state.setCompletedUnits,
    ]);

  const { data: courseData, isLoading: isCourseLoading } = useQuery({
    queryFn: getCourseForProfile,
    queryKey: [GET_COURSE_FOR_PROFILE],
  });

  const courseId = courseData && courseData.id;

  const {
    data: unitsWithAssociatedLessons,
    isLoading: isLessonResponseLoading,
  } = useQuery({
    queryFn: getUnitsWithLessonCompletion.bind(null, courseId),
    queryKey: [GET_UNITS_WITH_LESSON_COMPLETION, courseId],
    enabled: !!courseId,
    //FIXME
    // onSuccess: (data: ProfileProgressResult) => {
    //   const unitData: ProfileProgress = {};
    //   data.result.map(profileCompletion => {
    //     unitData[profileCompletion.id] = profileCompletion.lessonsWithStatus;
    //   });
    //   setProfileProgress(unitData);
    // },
  });

  const { data: unitResponses, isLoading: isUnitResponsesLoading } = useQuery({
    queryFn: getUnitResponse,
    queryKey: [GET_UNIT_RESPONSE],
  });

  useEffect(() => {
    !!unitResponses &&
      setCompletedUnits(
        new Set<string>(unitResponses.map(unitResponse => unitResponse.unitId)),
      );
  }, [setCompletedUnits, unitResponses]);

  const nextActivityToCompleteIndex =
    (unitsWithAssociatedLessons &&
      unitsWithAssociatedLessons.findIndex(
        unit => !completedUnits.has(unit.id),
      )) ||
    -1;

  useEffect(() => {
    setTimeout(() => {
      if (nextActivityToCompleteIndex !== -1) {
        listRef.current?.scrollToIndex({
          animated: false,
          index: nextActivityToCompleteIndex,
        });
      }
    }, 1000);
  }, [nextActivityToCompleteIndex]);

  const listRef = useRef<FlatList<UnitWithAssociatedLessons>>(null);

  if (isCourseLoading || isLessonResponseLoading || isUnitResponsesLoading) {
    return <H1>Loading..</H1>;
  }

  return (
    <Screen p={16}>
      <FlatList
        contentContainerStyle={styles.mainFlatListContainerStyle}
        ref={listRef}
        data={unitsWithAssociatedLessons}
        keyExtractor={unitWithLessons => unitWithLessons.id}
        renderItem={({ item: unitWithLessons, index }) => (
          <UnitItem unitWithLessons={unitWithLessons} index={index} />
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  mainFlatListContainerStyle: {
    flex: 1,
    height: '100%',
  },
});
