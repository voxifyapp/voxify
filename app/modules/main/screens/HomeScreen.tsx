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
  GET_LESSON_RESPONSES_WITH_LESSON_AND_UNIT,
  getLessonResponsesWithLessonAndUnit,
} from '@voxify/api/lms-progress/lesson-response';
import { ProfileProgress } from '@voxify/types/lms-progress/lesson-response';
import {
  ProgressActions,
  ProgressState,
  useProfileProgressStore,
} from '@voxify/modules/main/screens/useProfileProgressStore';
import {
  GET_UNIT_RESPONSE,
  getUnitResponse,
} from '@voxify/api/lms-progress/unit-response';

type Props = {
  navigation: {
    navigate: Function;
  };
};

export const HomeScreen = ({ navigation }: Props) => {
  const [setProfileProgress, setCompletedUnits] = useProfileProgressStore(
    (state: ProgressState & ProgressActions) => [
      state.setProfileProgress,
      state.setCompletedUnits,
    ],
  );

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
      queryFn: getLessonResponsesWithLessonAndUnit.bind(null, courseId),
      queryKey: [GET_LESSON_RESPONSES_WITH_LESSON_AND_UNIT, courseId],
      enabled: !!courseId,
    },
  );

  const { data: unitResponses, isLoading: isUnitResponsesLoading } = useQuery({
    queryFn: getUnitResponse,
    queryKey: [GET_UNIT_RESPONSE],
  });

  useEffect(() => {
    const unitData: ProfileProgress = {};
    lessonResponse &&
      lessonResponse.result.map(profileProg => {
        Object.keys(profileProg).map(
          unitId => (unitData[unitId] = profileProg[unitId]),
        );
      });

    setProfileProgress(unitData);
  }, [lessonResponse, setProfileProgress]);

  useEffect(() => {
    !!unitResponses &&
      setCompletedUnits(
        new Set<string>(unitResponses.map(unitResponse => unitResponse.unitId)),
      );
  }, [setCompletedUnits, unitResponses]);

  const listRef = useRef<FlatList<ProfileProgress>>(null);

  if (isCourseLoading || isLessonResponseLoading || isUnitResponsesLoading) {
    return <H1>Loading..</H1>;
  }

  const getLessonsFromUnit = (unit: ProfileProgress) => {
    const unitId = Object.keys(unit)[0];
    return unit[unitId].map(lesson => (
      <View key={lesson.lesson_id} style={styles.lessonContainer}>
        <Circle size="$1" style={styles.circle} />
        <Text onPress={() => onPress(lesson.lesson_id, unitId)}>
          {lesson.lesson_title}
        </Text>
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
        keyExtractor={(lr, index) => Object.keys(lr)[0] || `${index}`}
        renderItem={({ item: unit, index }) => (
          <View>
            <Card>
              <Card.Header padded>
                <Paragraph theme="alt2">Day {index + 1}</Paragraph>
                <Spacer size={20} />
                {getLessonsFromUnit(unit)}
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
