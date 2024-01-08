import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { FlatList } from 'react-native';
import { H1 } from 'tamagui';

import { Screen } from '@voxify/design_system/layout';
import { UnitItem } from '@voxify/modules/main/screens/HomeScreen/components/UnitItem';
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

  const { isLoading: isUnitsSyncing } = useSyncUnits(courseId);

  let unitToWorkOnIndex =
    unitsWithAssociatedLessons &&
    unitsWithAssociatedLessons.findIndex(unit => !completedUnits[unit.id]);
  if (unitToWorkOnIndex === -1) {
    unitToWorkOnIndex = unitsWithAssociatedLessons?.length || -1;
  }

  if (isCourseLoading || isLessonResponseLoading || isUnitsSyncing) {
    return <H1>Loading..</H1>;
  }

  return (
    <Screen paddingHorizontal="$3">
      {unitsWithAssociatedLessons && (
        <FlatList
          onLayout={() => {
            if (unitToWorkOnIndex) {
              listRef.current?.scrollToIndex({
                animated: true,
                index:
                  unitToWorkOnIndex === unitsWithAssociatedLessons?.length
                    ? unitToWorkOnIndex - 1
                    : unitToWorkOnIndex,
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
                locked={unitToWorkOnIndex ? index > unitToWorkOnIndex : false}
              />
            );
          }}
        />
      )}
    </Screen>
  );
};
