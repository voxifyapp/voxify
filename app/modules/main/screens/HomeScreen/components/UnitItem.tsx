import React from 'react';

import { Constants } from '@voxify/appConstants';
import { XStack, YStack } from '@voxify/design_system/layout';
import { H3, H5 } from '@voxify/design_system/typography';
import { ProfileProgressByUnit } from '@voxify/types/lms-progress/profile-progress';
import { Card, Image, View } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import { AppStackNavigationProp } from '@voxify/App';

type UnitItemProps = {
  unitWithLessons: ProfileProgressByUnit;
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

        <View flex={1} w={1} backgroundColor="$color.gray5" />
      </YStack>
      <YStack mb={50} flex={1}>
        <LessonsForUnit unitWithLessons={unitWithLessons} />
      </YStack>
    </XStack>
  );
};

type LessonsForUnitProps = {
  unitWithLessons: ProfileProgressByUnit;
};
export const LessonsForUnit = ({ unitWithLessons }: LessonsForUnitProps) => {
  const navigation = useNavigation<AppStackNavigationProp>();
  const unitLessons = unitWithLessons.lessonsWithStatus
    .sort((lesson1, lesson2) => lesson1.order - lesson2.order)
    .filter(lesson => !!lesson);
  return unitLessons.map(lesson => (
    <Card
      onPress={() =>
        navigation.navigate('Lesson', {
          lessonId: lesson.id,
          unitId: unitWithLessons.id,
        })
      }
      mt="$2"
      mr="$1"
      backgroundColor="white"
      elevation={1}>
      <XStack width="100%" p="$4" alignItems="center" key={lesson.id}>
        <Image
          resizeMode="contain"
          mr="$4"
          borderRadius={32}
          source={{
            width: 64,
            height: 64,
            uri: `${Constants.IMAGE_HOST_PREFIX}/${lesson.homeImageFileName}`,
          }}
        />
        <H5 adjustsFontSizeToFit numberOfLines={2} fontWeight="bold">
          {lesson.title}
        </H5>
      </XStack>
    </Card>
  ));
};
