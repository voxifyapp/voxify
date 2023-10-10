import { GET_UNITS, getUnits } from '@voxify/api/lms/lms';
import { useQuery } from 'react-query';
import { UnitEntity } from '@voxify/types/lms/lms';
import React, { useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Spacer, YStack, H1, Card, Text, Paragraph } from 'tamagui';
import { Circle } from '@tamagui/lucide-icons';

type Props = {
  navigation: {
    navigate: Function;
  };
};

export const HomeScreen = ({ navigation }: Props) => {
  const onPress = (lessonId: string, title: string) => {
    navigation.navigate('Lesson', { lessonId, title });
  };

  const courseId = 'f1655c51-5986-4196-b5a1-c56fc3aa179a';
  const { data: units, isLoading: isUnitsLoading } = useQuery({
    queryFn: getUnits.bind(null, courseId),
    queryKey: [GET_UNITS, courseId],
  });

  const listRef = useRef<FlatList<UnitEntity>>(null);

  if (isUnitsLoading) {
    return <H1>Loading...</H1>;
  }

  return (
    <YStack fullscreen theme="green" backgroundColor={'$blue2Dark'}>
      <FlatList
        contentContainerStyle={{ marginTop: 20 }}
        decelerationRate={0.8}
        ref={listRef}
        data={units}
        disableIntervalMomentum
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
                    <Text onPress={() => onPress(lesson.id, lesson.title)}>
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
