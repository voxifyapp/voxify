import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { AppStackNavigationProp } from '@voxify/App';
import { Constants } from '@voxify/appConstants';
import { XStack, YStack } from '@voxify/design_system/layout';
import { H3, H5 } from '@voxify/design_system/typography';
import { CompletedChip } from '@voxify/modules/main/screens/HomeScreen/components/CompletedChip';
import { useProfileProgressStore } from '@voxify/modules/main/store/profileProgress';
import { LessonResponseStatus } from '@voxify/types/lms-progress/lesson-response';
import {
  LessonWithStatus,
  UnitWithAssociatedLessons,
} from '@voxify/types/lms-progress/profile-progress';
import { Card, Image, Text, View } from 'tamagui';

type UnitItemProps = {
  unitWithLessons: UnitWithAssociatedLessons;
  index: number;
};
export const UnitItem = ({ index, unitWithLessons }: UnitItemProps) => {
  return (
    <XStack>
      <YStack mr="$4" alignItems="center">
        <YStack paddingVertical="$2" alignItems="center">
          <H5 fontWeight="bold">DAY</H5>
          <H3 fontWeight="bold">{index + 1}</H3>
        </YStack>

        <View flex={1} w={2} backgroundColor="$color.gray5" />
      </YStack>
      <YStack mb={50} flex={1}>
        <LessonsForUnit unitWithLessons={unitWithLessons} />
      </YStack>
    </XStack>
  );
};

type LessonsForUnitProps = {
  unitWithLessons: UnitWithAssociatedLessons;
};
export const LessonsForUnit = ({ unitWithLessons }: LessonsForUnitProps) => {
  const unitLessons = unitWithLessons.lessonsWithStatus
    .sort((lesson1, lesson2) => lesson1.order - lesson2.order)
    .filter(i => !!i);

  return unitLessons.map(lesson => (
    <LessonItem key={lesson.id} lesson={lesson} />
  ));
};

const LessonItem = ({ lesson }: { lesson: LessonWithStatus }) => {
  const navigation = useNavigation<AppStackNavigationProp>();
  const lessonStatus = useProfileProgressStore(state => state.lessonStatus);

  const isLessonCompleted =
    lessonStatus[lesson.id] === LessonResponseStatus.COMPLETED;

  return (
    <Card
      overflow="hidden"
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
