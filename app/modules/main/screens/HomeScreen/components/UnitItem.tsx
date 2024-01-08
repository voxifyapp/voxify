import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { AppStackNavigationProp } from '@voxify/App';
import { Constants } from '@voxify/appConstants';
import { XStack, YStack } from '@voxify/design_system/layout';
import { CompletedChip } from '@voxify/modules/main/screens/HomeScreen/components/CompletedChip';
import {
  DayText,
  ProgressLine,
} from '@voxify/modules/main/screens/HomeScreen/components/ProgressLine';
import { useProfileProgressStore } from '@voxify/modules/main/store/profileProgress';
import { LessonResponseStatus } from '@voxify/types/lms-progress/lesson-response';
import {
  LessonWithStatus,
  UnitWithAssociatedLessons,
} from '@voxify/types/lms-progress/profile-progress';
import { Card, Image, Text } from 'tamagui';

type UnitItemProps = {
  unitWithLessons: UnitWithAssociatedLessons;
  index: number;
  locked: boolean;
};
export const UnitItem = ({ index, unitWithLessons, locked }: UnitItemProps) => {
  const completedUnits = useProfileProgressStore(state => state.completedUnits);
  const isUnitCompleted = !!completedUnits[unitWithLessons.id];

  return (
    <XStack paddingTop={index === 0 ? '$4' : undefined}>
      <YStack mr="$4" alignItems="center">
        <DayText day={index + 1} completed={isUnitCompleted} />
        <ProgressLine completed={isUnitCompleted} />
      </YStack>
      <YStack mb={50} flex={1}>
        <LessonsForUnit unitWithLessons={unitWithLessons} lockAll={locked} />
      </YStack>
    </XStack>
  );
};

type LessonsForUnitProps = {
  unitWithLessons: UnitWithAssociatedLessons;
  lockAll: boolean;
};
export const LessonsForUnit = ({
  unitWithLessons,
  lockAll,
}: LessonsForUnitProps) => {
  const unitLessons = unitWithLessons.lessonsWithStatus
    .sort((lesson1, lesson2) => lesson1.order - lesson2.order)
    .filter(i => !!i);

  return unitLessons.map(lesson => (
    <LessonItem key={lesson.id} lesson={lesson} locked={lockAll} />
  ));
};

const LessonItem = ({
  lesson,
  locked,
}: {
  lesson: LessonWithStatus;
  locked: boolean;
}) => {
  const navigation = useNavigation<AppStackNavigationProp>();
  const lessonStatus = useProfileProgressStore(state => state.lessonStatus);

  const isLessonCompleted =
    lessonStatus[lesson.id] === LessonResponseStatus.COMPLETED;

  return (
    <Card
      opacity={locked ? 0.5 : 1}
      overflow="hidden"
      disabled={locked}
      onPress={() => {
        navigation.navigate('Lesson', {
          lessonId: lesson.id,
          unitId: lesson.unitId,
        });
      }}
      mt="$2"
      mr="$1"
      backgroundColor="white"
      elevation={1}>
      <XStack alignItems="center" key={lesson.id}>
        <Image
          resizeMode="cover"
          mr="$4"
          maxWidth="30%"
          minHeight={80}
          minWidth={80}
          height="100%"
          source={{
            uri: `${Constants.IMAGE_HOST_PREFIX}/${lesson.homeImageFileName}`,
          }}
        />
        <YStack flex={1} space="$2" paddingVertical={32}>
          <Text
            fontSize="$8"
            color="$color.blue10"
            adjustsFontSizeToFit
            numberOfLines={2}
            fontWeight="bold">
            {lesson.title}
          </Text>
          <CompletedChip isComplete={isLessonCompleted} />
        </YStack>
      </XStack>
    </Card>
  );
};
