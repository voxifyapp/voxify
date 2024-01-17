import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { FlatList } from 'react-native';
import { YStack } from 'tamagui';

import { Screen } from '@voxify/design_system/layout';
import { UnitItem } from '@voxify/modules/main/screens/HomeScreen/components/UnitItem';
import { useGetUnitsWithAssociatedLessonsForCourse } from '@voxify/modules/main/screens/HomeScreen/hooks/useGetUnitsWithAssociatedLessons';
import { useProfileProgressStore } from '@voxify/modules/main/store/profileProgress';

import {
  GET_COURSE_FOR_PROFILE,
  getCourseForProfile,
} from '@voxify/api/auth/profile';
import { LoadingWithErrorContainer } from '@voxify/common/components/LoadingWithErrorContainer';
import { H4 } from '@voxify/design_system/typography';
import { useSyncUnits } from '@voxify/modules/main/screens/HomeScreen/hooks/useSyncUnits';
import { UnitWithAssociatedLessons } from '@voxify/types/lms-progress/profile-progress';

const MORE_COMING_SOON = {
  id: 'more-coming-soon',
};

export const HomeScreen = () => {
  const listRef =
    useRef<FlatList<UnitWithAssociatedLessons | typeof MORE_COMING_SOON>>(null);
  const completedUnits = useProfileProgressStore(state => state.completedUnits);

  const {
    data: courseData,
    isLoading: isCourseLoading,
    error: getCourseError,
  } = useQuery({
    queryFn: getCourseForProfile,
    queryKey: [GET_COURSE_FOR_PROFILE],
  });

  const courseId = courseData && courseData.id;

  const {
    data: unitsWithAssociatedLessons,
    isLoading: isLessonResponseLoading,
    error: getUnitsError,
  } = useGetUnitsWithAssociatedLessonsForCourse(courseId);

  const { isLoading: isUnitsSyncing, error: syncUnitsError } =
    useSyncUnits(courseId);

  let unitToWorkOnIndex =
    unitsWithAssociatedLessons &&
    unitsWithAssociatedLessons.findIndex(unit => !completedUnits[unit.id]);
  if (unitToWorkOnIndex === -1) {
    const isThereAnyUnitCompleted = !!unitsWithAssociatedLessons?.find(
      unit => !!completedUnits[unit.id],
    );
    if (!isThereAnyUnitCompleted) {
      unitToWorkOnIndex = 0;
    } else {
      unitToWorkOnIndex = unitsWithAssociatedLessons?.length || -1;
    }
  }

  const flatListItems = [
    ...(unitsWithAssociatedLessons || []),
    MORE_COMING_SOON,
  ];

  return (
    <Screen noPadding paddingHorizontal="$3">
      <LoadingWithErrorContainer
        error={getUnitsError || syncUnitsError || getCourseError}
        isLoading={
          isCourseLoading || isLessonResponseLoading || isUnitsSyncing
        }>
        {flatListItems && (
          <FlatList
            onLayout={() => {
              if (unitToWorkOnIndex) {
                listRef.current?.scrollToIndex({
                  animated: true,
                  index: unitToWorkOnIndex,
                  viewOffset: 100,
                });
              }
            }}
            ref={listRef}
            data={flatListItems}
            keyExtractor={unitWithLessons => unitWithLessons.id}
            renderItem={({ item: flatListItem, index }) => {
              if (flatListItem === MORE_COMING_SOON) {
                return (
                  <YStack p="$4" alignItems="center">
                    <H4 textAlign="center" fontWeight="bold">
                      We are working on making more content available for you.
                      Please check back here tomorrow!
                    </H4>
                  </YStack>
                );
              }
              const unitWithLessons = flatListItem as UnitWithAssociatedLessons;
              return (
                <UnitItem
                  unitWithLessons={unitWithLessons}
                  index={index}
                  locked={
                    unitToWorkOnIndex !== undefined
                      ? index > unitToWorkOnIndex
                      : false
                  }
                />
              );
            }}
          />
        )}
      </LoadingWithErrorContainer>
    </Screen>
  );
};
