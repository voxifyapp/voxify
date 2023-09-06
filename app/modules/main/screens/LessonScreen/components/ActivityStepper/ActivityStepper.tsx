/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
//TODO Remove lint ignores above
import { ActivityRendererMachineRestoreDataType } from '@voxify/modules/main/components/ActivityRenderer/activityRenderer.machine';
import { ActivityStep } from '@voxify/modules/main/screens/LessonScreen/components/ActivityStepper/ActivityStep';
import { ActivityEntity } from '@voxify/types/lms/lms';
import { atom, useAtomValue } from 'jotai';

import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, View, ViewToken } from 'react-native';
import { Spacer, YStack } from 'tamagui';

const activityAspectRatio = 9 / 15;
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const width = screenWidth / 1.1;
const height = width / activityAspectRatio;

const firstAndLastElementMargin = (screenHeight - height) / 2;

type Props = {
  activities: ActivityEntity[];
};

export const completedActivitiesAtom = atom<
  Record<string, ActivityRendererMachineRestoreDataType>
>({});

export const ActivityStepper = ({ activities }: Props) => {
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0);
  const listRef = useRef<FlatList<ActivityEntity>>(null);

  let renderedActivities = activities;

  const completedActivities = useAtomValue(completedActivitiesAtom);

  const nextActivityToCompleteIndex = renderedActivities.findIndex(
    activity => !completedActivities[activity.id],
  );

  // renderedActivities = slice(
  //   renderedActivities,
  //   0,
  //   nextActivityToCompleteIndex + 1,
  // );

  useEffect(() => {
    setTimeout(() => {
      if (nextActivityToCompleteIndex) {
        listRef.current?.scrollToIndex({
          animated: true,
          index: nextActivityToCompleteIndex,
        });
      }
    }, 1000);
  }, [nextActivityToCompleteIndex]);

  const getItemLayout = (_: any, index: number) => ({
    index: index,
    offset: index * (height + 20),
    length: height + 20,
  });

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: { itemVisiblePercentThreshold: 100 },
      onViewableItemsChanged: ({
        viewableItems,
      }: {
        viewableItems: ViewToken[];
        changed: ViewToken[];
      }) => {
        viewableItems[0] && setCurrentActiveIndex(viewableItems[0].index!);
      },
    },
  ]);

  return (
    <YStack theme="green" backgroundColor={'$blue2Dark'}>
      <FlatList
        decelerationRate={0.8}
        getItemLayout={getItemLayout}
        ref={listRef}
        data={renderedActivities}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        disableIntervalMomentum
        snapToOffsets={renderedActivities.map((_, index) => {
          return getItemLayout(_, index).offset;
        })}
        ItemSeparatorComponent={() => <Spacer size={20} />}
        keyExtractor={(activity, index) => activity.id || `${index}`}
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
            <ActivityStep
              restoreData={completedActivities[activity.id]}
              activity={activity}
              isActive={index === currentActiveIndex}
            />
          </View>
        )}
      />
    </YStack>
  );
};
