import { GET_UNITS, getUnits } from '@voxify/api/lms/lms';
import { useQuery } from 'react-query';
import { UnitEntity } from '@voxify/types/lms/lms';
import React, { useRef } from 'react';
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

type Props = {
  navigation: {
    navigate: Function;
  };
};

export const HomeScreen = ({ navigation }: Props) => {
  const onPress = (lessonId: string) => {
    navigation.navigate('Lesson', { lessonId });
  };

  const { data: courseData, isLoading: isCourseLoading } = useQuery({
    queryFn: getCourseForProfile,
    queryKey: [GET_COURSE_FOR_PROFILE],
  });

  const courseId = courseData && courseData.id;

  const { data: units, isLoading: isUnitsLoading } = useQuery({
    queryFn: getUnits.bind(null, courseId),
    queryKey: [GET_UNITS, courseId],
    enabled: !!courseId,
  });

  const { data: lessonResponse, isLoading: isLessonResponseLoading } = useQuery(
    {
      queryFn: getLessonResponsesWithLessonAndUnit.bind(null, courseId),
      queryKey: [GET_LESSON_RESPONSES_WITH_LESSON_AND_UNIT, courseId],
      enabled: !!courseId,
    },
  );

  const listRef = useRef<FlatList<UnitEntity>>(null);

  if (isCourseLoading || isUnitsLoading || isLessonResponseLoading) {
    return <H1>Loading..</H1>;
  }

  console.log(JSON.stringify(lessonResponse));

  return (
    <YStack fullscreen theme="green" backgroundColor={'$blue2Dark'}>
      <FlatList
        contentContainerStyle={{ marginTop: 20 }}
        ref={listRef}
        data={units}
        ItemSeparatorComponent={() => <Spacer size={20} />}
        keyExtractor={(unit, index) => unit.id || `${index}`}
        renderItem={({ item: unit, index }) => (
          <View>
            <Card>
              <Card.Header padded>
                <Paragraph theme="alt2">Day {index + 1}</Paragraph>
                <Spacer size={20} />
                {unit.lessons.map(lesson => (
                  <View key={lesson.id} style={styles.lessonContainer}>
                    <Circle size="$1" style={styles.circle} />
                    <Text onPress={() => onPress(lesson.id)}>
                      {lesson.title}
                    </Text>
                  </View>
                ))}
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
