/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
//TODO Remove lint ignores above
import { ActivityStep } from '@voxify/modules/main/screens/LessonScreen/components/ActivityStepper/ActivityStep';
import { ActivityEntity } from '@voxify/types/lms/lms';
import React from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { Spacer, YStack } from 'tamagui';

const activityAspectRatio = 9 / 15;
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const width = screenWidth / 1.1;
const height = width / activityAspectRatio;

const firstAndLastElementMargin = (screenHeight - height) / 2;

type Props = {
  activities: ActivityEntity[];
};

export const ActivityStepper = ({ activities }: Props) => {
  // for (let i = 0; i < 5; i++) {
  //   activities.push(
  //     ...activities.map(a => ({
  //       ...a,
  //       id: '' + Math.floor(Math.random() * 10000) + 1,
  //     })),
  //   );
  // }

  return (
    <YStack theme="green" backgroundColor={'$blue2Dark'}>
      <FlatList
        data={activities}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
        }}
        disableIntervalMomentum
        snapToOffsets={activities.map((_, index) => {
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
                index === activities.length - 1
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
