/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
//TODO Remove lint ignores above
import { ActivityStep } from '@voxify/modules/main/screens/LessonScreen/components/ActivityStepper/ActivityStep';
import { ActivityEntity } from '@voxify/types/lms/lms';
import React, { useMemo } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { Spacer, YStack } from 'tamagui';
import { atom, useAtomValue } from 'jotai';

const activityAspectRatio = 9 / 15;
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const width = screenWidth / 1.1;
const height = width / activityAspectRatio;

const firstAndLastElementMargin = (screenHeight - height) / 2;

type Props = {
  activities: ActivityEntity[];
};

export const completedActivitiesAtom = atom<Record<string, any>>({});

export const ActivityStepper = ({ activities }: Props) => {
  const renderedActivities: ActivityEntity[] = useMemo(() => {
    const result = [];
    for (let i = 0; i < 100; i++) {
      const a = activities[0];
      result.push({
        ...a,
        id: '' + Math.floor(Math.random() * 1000000) + 1,
      });
    }
    return result;
  }, [activities]);

  const completedActivities = useAtomValue(completedActivitiesAtom);

  return (
    <YStack theme="green" backgroundColor={'$blue2Dark'}>
      <FlatList
        data={renderedActivities}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
        }}
        disableIntervalMomentum
        snapToOffsets={renderedActivities.map((_, index) => {
          const offset = index * (height + 20);
          return offset;
        })}
        ItemSeparatorComponent={() => <Spacer size={20} />}
        style={{ width: '100%', height: '100%' }}
        keyExtractor={(activity, index) => activity?.id || `${index}`}
        renderItem={({ item: activity, index }) => (
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              width,
              height,
              marginTop: index === 0 ? firstAndLastElementMargin : undefined,
              marginBottom:
                index === renderedActivities.length - 1
                  ? firstAndLastElementMargin
                  : undefined,
            }}>
            <ActivityStep activity={activity} />
          </View>
        )}
      />
    </YStack>
  );
};
