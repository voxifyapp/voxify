import {
  GET_LESSON,
  GET_LESSON_ACTIVITIES,
  getLesson,
  getLessonActivities,
} from '@voxify/api/lms/lms';
import { ActivityStepper } from '@voxify/modules/main/screens/LessonScreen/components/ActivityStepper/ActivityStepper';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { useQuery } from 'react-query';
import { Button, H1, Text, View, XStack } from 'tamagui';

export const LessonScreen = () => {
  const [lessonIdValue, setLessonIdValue] = useState(
    'b0248d2a-8b54-4b61-ae28-58eb1891c79d',
  );
  const [lessonId, setLessonId] = useState(
    'b0248d2a-8b54-4b61-ae28-58eb1891c79d',
  );
  const { isLoading: isLessonLoading } = useQuery({
    queryFn: getLesson.bind(null, lessonId),
    queryKey: [GET_LESSON, lessonId],
  });

  const {
    data: lessonActivities,
    isLoading: isLessonActivitiesLoading,
    error,
  } = useQuery({
    queryFn: getLessonActivities.bind(null, lessonId),
    queryKey: [GET_LESSON_ACTIVITIES, lessonId],
  });

  if (isLessonLoading || isLessonActivitiesLoading) {
    return <H1>Loading...</H1>;
  }

  return (
    <View>
      <XStack style={{ backgroundColor: 'red' }}>
        <TextInput
          style={{ flex: 1 }}
          value={lessonIdValue}
          onChangeText={e => setLessonIdValue(e)}
        />
        <Button onPress={() => setLessonId(lessonIdValue)}>Load</Button>
      </XStack>
      {lessonActivities && <ActivityStepper activities={lessonActivities} />}
    </View>
  );
};
