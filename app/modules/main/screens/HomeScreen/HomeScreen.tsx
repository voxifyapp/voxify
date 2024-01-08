import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { FlatList } from 'react-native';
import { H1 } from 'tamagui';

import { Screen } from '@voxify/design_system/layout';
import { UnitItem } from '@voxify/modules/main/screens/HomeScreen/components/UnitItem';
import { useGetUnitResponses } from '@voxify/modules/main/screens/HomeScreen/hooks/useGetUnitResponses';
import { useGetUnitsWithAssociatedLessonsForCourse } from '@voxify/modules/main/screens/HomeScreen/hooks/useGetUnitsWithAssociatedLessons';
import { useProfileProgressStore } from '@voxify/modules/main/store/profileProgress';

import {
  GET_COURSE_FOR_PROFILE,
  getCourseForProfile,
} from '@voxify/api/auth/profile';
import { useSyncUnits } from '@voxify/modules/main/screens/HomeScreen/hooks/useSyncUnits';
import { UnitWithAssociatedLessons } from '@voxify/types/lms-progress/profile-progress';

export const HomeScreen = () => {
  const listRef = useRef<FlatList<UnitWithAssociatedLessons>>(null);
  const completedUnits = useProfileProgressStore(state => state.completedUnits);

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

  useSyncUnits(courseId);

  const unitToWorkOnIndex =
    (unitsWithAssociatedLessons &&
      unitsWithAssociatedLessons.findIndex(unit => !completedUnits[unit.id])) ||
    -1;

  // useEffect(() => {}, [unitToWorkOnIndex]);

  if (isCourseLoading || isLessonResponseLoading || isUnitResponsesLoading) {
    return <H1>Loading..</H1>;
  }

  return (
    <Screen paddingHorizontal="$3">
      <FlatList
        onLayout={() => {
          if (unitToWorkOnIndex !== -1) {
            listRef.current?.scrollToIndex({
              animated: true,
              index: unitToWorkOnIndex,
              viewOffset: 100,
            });
          }
        }}
        ref={listRef}
        data={unitsWithAssociatedLessons}
        keyExtractor={unitWithLessons => unitWithLessons.id}
        renderItem={({ item: unitWithLessons, index }) => {
          return (
            <UnitItem
              unitWithLessons={unitWithLessons}
              index={index}
              locked={index > unitToWorkOnIndex}
            />
          );
        }}
      />
    </Screen>
  );
};
