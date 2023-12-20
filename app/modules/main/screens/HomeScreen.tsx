import { useQuery } from 'react-query';
import React, { useEffect, useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Spacer, YStack, H1, Card, Text, Paragraph } from 'tamagui';
import { Circle } from '@tamagui/lucide-icons';
import {
  GET_COURSE_FOR_PROFILE,
  getCourseForProfile,
} from '@voxify/api/auth/profile';
import {
  GET_UNITS_WITH_LESSON_COMPLETION,
  getUnitsWithLessonCompletion,
} from '@voxify/api/lms-progress/lesson-response';

import {
  ProgressActions,
  ProgressState,
  useProfileProgressStore,
} from '@voxify/modules/main/screens/useProfileProgressStore';
import {
  GET_UNIT_RESPONSE,
  getUnitResponse,
} from '@voxify/api/lms-progress/unit-response';
import {
  ProfileProgress,
  ProfileProgressByUnit,
  ProfileProgressResult,
} from '@voxify/types/lms-progress/profile-progress';

type Props = {
  navigation: {
    navigate: Function;
  };
};

export const HomeScreen = ({ navigation }: Props) => {
  const [setProfileProgress, completedUnits, setCompletedUnits] =
    useProfileProgressStore((state: ProgressState & ProgressActions) => [
      state.setProfileProgress,
      state.completedUnits,
      state.setCompletedUnits,
    ]);

  const onPress = (lessonId: string, unitId: string) => {
    navigation.navigate('Lesson', { lessonId, unitId });
  };

  const { data: courseData, isLoading: isCourseLoading } = useQuery({
    queryFn: getCourseForProfile,
    queryKey: [GET_COURSE_FOR_PROFILE],
  });

  const courseId = courseData && courseData.id;

  const { data: lessonResponse, isLoading: isLessonResponseLoading } = useQuery(
    {
      queryFn: getUnitsWithLessonCompletion.bind(null, courseId),
      queryKey: [GET_UNITS_WITH_LESSON_COMPLETION, courseId],
      enabled: !!courseId,
      onSuccess: (data: ProfileProgressResult) => {
        const unitData: ProfileProgress = {};
        data.result.map(profileCompletion => {
          unitData[profileCompletion.id] = profileCompletion.lessonsWithStatus;
        });
        setProfileProgress(unitData);
      },
    },
  );

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
    (lessonResponse &&
      lessonResponse.result.findIndex(unit => !completedUnits.has(unit.id))) ||
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

  const listRef = useRef<FlatList<ProfileProgressByUnit>>(null);

  if (isCourseLoading || isLessonResponseLoading || isUnitResponsesLoading) {
    return <H1>Loading..</H1>;
  }

  const getLessonsFromUnit = (unit: ProfileProgressByUnit) => {
    const unitId = unit.id;
    const unitLessons = unit.lessonsWithStatus.sort(
      (lesson1, lesson2) => lesson1.order - lesson2.order,
    );
    return unitLessons.map(lesson => (
      <View key={lesson.id} style={styles.lessonContainer}>
        <Circle size="$1" style={styles.circle} />
        <Text onPress={() => onPress(lesson.id, unitId)}>{lesson.title}</Text>
      </View>
    ));
  };

  return (
    <YStack fullscreen theme="green" backgroundColor={'$blue2Dark'}>
      <FlatList
        contentContainerStyle={{ marginTop: 20 }}
        ref={listRef}
        data={lessonResponse?.result}
        ItemSeparatorComponent={() => <Spacer size={300} />}
        keyExtractor={unitWithLessons => unitWithLessons.id}
        renderItem={({ item: unitWithLessons, index }) => (
          <View>
            <Card>
              <Card.Header padded>
                <Paragraph theme="alt2">Day {index + 1}</Paragraph>
                <Spacer size={20} />
                {getLessonsFromUnit(unitWithLessons)}
              </Card.Header>
            </Card>
          </View>
        )}
      />
    </YStack>
  );
};

const styles = StyleSheet.create({
  lessonContainer: {
    flexDirection: 'row',
  },
  circle: {
    marginRight: 10,
  },
});
