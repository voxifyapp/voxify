import { YStack } from '@voxify/design_system/layout';
import { ActivityRendererMachineRestoreDataType } from '@voxify/modules/main/components/ActivityRenderer/activityRenderer.machine';
import { ActivityStep } from '@voxify/modules/main/screens/LessonScreen/components/ActivityStepper/ActivityStep';
import { StepCard } from '@voxify/modules/main/screens/LessonScreen/components/ActivityStepper/components/StepCard';
import { ActivityEntity } from '@voxify/types/lms/lms';
import { useAtomValue } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewToken,
} from 'react-native';

// These calculations are to make sure that the first and last elements are centered
export const activityAspectRatio = 9 / 15;
export const { width: screenWidth, height: screenHeight } =
  Dimensions.get('window');
export const stepCardWidth = screenWidth / 1.2;
export const stepCardHeight = stepCardWidth / activityAspectRatio;
const stepCardMarginBottom = 20;
const flatListItemHeight = stepCardHeight + stepCardMarginBottom;
export const firstAndLastElementMargin = (screenHeight - stepCardHeight) / 2;

type Props = {
  activities: ActivityEntity[];
  lessonResponseId: string;
  /**
   * This callback is called when the user has gone through all activities
   */
  onLessonComplete: () => void;
  lessonId: string;
};

export const completedActivitiesAtom = atomWithReset<
  Record<string, ActivityRendererMachineRestoreDataType>
>({});

export const ActivityStepper = ({ activities, lessonResponseId }: Props) => {
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0);
  const activitiesFlatListRef = useRef<FlatList<ActivityEntity>>(null);

  let renderedActivities = activities;

  const completedActivities = useAtomValue(completedActivitiesAtom);
  const resetCompletedActivities = useResetAtom(completedActivitiesAtom);

  const nextActivityToCompleteIndex = renderedActivities.findIndex(
    activity => !completedActivities[activity.id],
  );

  // We want to reset the completed activities when the component unmounts
  // or else the next time the user opens the lesson it will be marked as completed
  useEffect(() => {
    return () => {
      resetCompletedActivities();
    };
  }, [resetCompletedActivities]);

  // renderedActivities = slice(
  //   renderedActivities,
  //   0,
  //   nextActivityToCompleteIndex === -1
  //     ? renderedActivities.length
  //     : nextActivityToCompleteIndex + 1,
  // );

  useEffect(() => {
    setTimeout(() => {
      if (nextActivityToCompleteIndex !== -1) {
        activitiesFlatListRef.current?.scrollToIndex({
          animated: true,
          index: nextActivityToCompleteIndex,
        });
      }
    }, 1000);
  }, [nextActivityToCompleteIndex]);

  // useEffect(() => {
  //   let completedActivitiesCount = 0;
  //   renderedActivities.forEach(
  //     activity =>
  //       completedActivities[activity.id] && ++completedActivitiesCount,
  //   );

  //   completedActivitiesCount === renderedActivities.length &&
  //     !lessonCompletionInfo.get(lessonId)?.isCompleted &&
  //     onLessonComplete();
  // }, [
  //   completedActivities,
  //   lessonCompletionInfo,
  //   lessonId,
  //   lessonResponseId,
  //   onLessonComplete,
  //   renderedActivities,
  // ]);

  const getItemLayout = (_: any, index: number) => ({
    index: index,
    offset: index * (stepCardHeight + 20),
    length: stepCardHeight + 20,
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

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    // We want to limit scrolling to the next activity until the previous activities are finished
    // This allows a nice way to allow the user to see that there is more content but not allow them to scroll to it
    const currentContentOffset = e.nativeEvent.contentOffset.y;

    const maxScrollableOffset =
      nextActivityToCompleteIndex * flatListItemHeight + flatListItemHeight / 4;

    if (currentContentOffset > maxScrollableOffset) {
      activitiesFlatListRef.current?.scrollToIndex({
        index: nextActivityToCompleteIndex,
      });
    }
  };

  return (
    <FlatList
      decelerationRate={0.8}
      getItemLayout={getItemLayout}
      ref={activitiesFlatListRef}
      data={renderedActivities}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      disableIntervalMomentum
      snapToOffsets={renderedActivities.map((_, index) => {
        return getItemLayout(_, index).offset;
      })}
      onScroll={handleScroll}
      // ItemSeparatorComponent={() => <Spacer size={20} />}
      keyExtractor={(activity, index) => activity.id || `${index}`}
      renderItem={({ item: activity, index }) => (
        <YStack alignItems="center" mb={stepCardMarginBottom}>
          <StepCard
            width={stepCardWidth}
            height={stepCardHeight}
            mb={
              index === renderedActivities.length - 1
                ? firstAndLastElementMargin
                : undefined
            }
            mt={index === 0 ? firstAndLastElementMargin : undefined}>
            <ActivityStep
              index={index}
              restoreData={completedActivities[activity.id]}
              activity={activity}
              isActive={index === currentActiveIndex}
              lessonResponseId={lessonResponseId}
            />
          </StepCard>
        </YStack>
      )}
    />
  );
};
