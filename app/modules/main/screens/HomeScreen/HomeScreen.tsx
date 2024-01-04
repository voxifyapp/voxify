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
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
  const { completedUnits } = useProfileProgressStore();

  const { data: courseData, isLoading: isCourseLoading } = useQuery({
    queryFn: getCourseForProfile,
    queryKey: [GET_COURSE_FOR_PROFILE],
  });

  const navigation = useNavigation();

  useEffect(() => {
    navigation.navigate('Lesson', {
      lessonId: '33304d27-4b6e-482b-b4c7-c028728f8ebc',
      unitId: '6b1cfe00-b741-42b8-8e74-f165f8c1574d',
    });
  }, [navigation]);

  const courseId = courseData && courseData.id;

  const {
    data: unitsWithAssociatedLessons,
    isLoading: isLessonResponseLoading,
  } = useGetUnitsWithAssociatedLessonsForCourse(courseId);

  const { isLoading: isUnitResponsesLoading } = useGetUnitResponses();

  const nextUnitToCompleteIndex =
    (unitsWithAssociatedLessons &&
      unitsWithAssociatedLessons.findIndex(unit => !completedUnits[unit.id])) ||
    -1;

  useEffect(() => {
    setTimeout(() => {
      if (nextUnitToCompleteIndex !== -1) {
        listRef.current?.scrollToIndex({
          animated: false,
          index: nextUnitToCompleteIndex,
        });
      }
    }, 1000);
  }, [nextUnitToCompleteIndex]);

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
