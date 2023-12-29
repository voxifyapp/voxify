import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { H1 } from 'tamagui';

import { Screen } from '@voxify/design_system/layout';
import { UnitItem } from '@voxify/modules/main/screens/HomeScreen/components/UnitItem';
import { useGetUnitResponses } from '@voxify/modules/main/screens/HomeScreen/hooks/useGetUnitResponses';
import { useGetUnitsWithAssociatedLessonsForCourse } from '@voxify/modules/main/screens/HomeScreen/hooks/useGetUnitsWithAssociatedLessons';
import { useProfileProgressStore } from '@voxify/modules/main/store/profileProgress';

import { UnitWithAssociatedLessons } from '@voxify/types/lms-progress/profile-progress';
import {
  GET_COURSE_FOR_PROFILE,
  getCourseForProfile,
} from '@voxify/api/auth/profile';

export const HomeScreen = () => {
  const { completedUnits } = useProfileProgressStore();

  const { data: courseData, isLoading: isCourseLoading } = useQuery({
    queryFn: getCourseForProfile,
    queryKey: [GET_COURSE_FOR_PROFILE],
  });

  const courseId = courseData && courseData.id;

  const {
    data: unitsWithAssociatedLessons,
    isLoading: isLessonResponseLoading,
  } = useGetUnitsWithAssociatedLessonsForCourse(courseId);

  const { isLoading: isUnitResponsesLoading } = useGetUnitResponses();

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
