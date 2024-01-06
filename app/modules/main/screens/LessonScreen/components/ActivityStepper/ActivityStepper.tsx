import { YStack } from '@voxify/design_system/layout';
import { ActivityRendererMachineRestoreDataType } from '@voxify/modules/main/components/ActivityRenderer/activityRenderer.machine';
import { ActivityStep } from '@voxify/modules/main/screens/LessonScreen/components/ActivityStepper/ActivityStep';
import { Results } from '@voxify/modules/main/screens/LessonScreen/components/ActivityStepper/components/Results';
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
// We are calculating the height and widht of the step card
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
   * This is only called once
   */
  onLessonComplete: () => void;
  lessonId: string;
};

export const completedActivitiesAtom = atomWithReset<
  Record<string, ActivityRendererMachineRestoreDataType>
>({});

const RESULTS_CARD = { id: 'results-card' };

export const ActivityStepper = ({ activities, lessonResponseId }: Props) => {
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0);
  const activitiesFlatListRef =
    useRef<FlatList<ActivityEntity | typeof RESULTS_CARD>>(null);

  // We want to show a result screen as the last page
  const flatListItems = [...activities, RESULTS_CARD] as const;

  const completedActivities = useAtomValue(completedActivitiesAtom);
  const resetCompletedActivities = useResetAtom(completedActivitiesAtom);

  const nextItemIndex = flatListItems.findIndex(
    activity => activity === RESULTS_CARD || !completedActivities[activity.id],
  );

  // We want to reset the completed activities when the component unmounts
  // or else the next time the user opens the lesson it will be marked as completed
  useEffect(() => {
    return () => {
      resetCompletedActivities();
    };
  }, [resetCompletedActivities]);

  useEffect(() => {
    setTimeout(() => {
      if (nextItemIndex !== -1) {
        activitiesFlatListRef.current?.scrollToIndex({
          animated: true,
          index: nextItemIndex,
        });
      }
    }, 1000);
  }, [nextItemIndex]);

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
      nextItemIndex * flatListItemHeight + flatListItemHeight / 4;

    if (currentContentOffset > maxScrollableOffset) {
      activitiesFlatListRef.current?.scrollToIndex({
        index: nextItemIndex,
      });
    }
  };

  return (
    <FlatList
      decelerationRate={0.8}
      getItemLayout={getItemLayout}
      ref={activitiesFlatListRef}
      data={flatListItems}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      disableIntervalMomentum
      snapToOffsets={flatListItems.map((_, index) => {
        return getItemLayout(_, index).offset;
      })}
      onScroll={handleScroll}
      // ItemSeparatorComponent={() => <Spacer size={20} />}
      keyExtractor={(activity, index) => activity.id || `${index}`}
      renderItem={({ item, index }) => (
        <YStack alignItems="center" mb={stepCardMarginBottom}>
          <StepCard
            width={stepCardWidth}
            height={stepCardHeight}
            mb={
              index === flatListItems.length - 1
                ? firstAndLastElementMargin
                : undefined
            }
            mt={index === 0 ? firstAndLastElementMargin : undefined}>
            {item === RESULTS_CARD ? (
              <Results />
            ) : (
              <ActivityStep
                index={index}
                restoreData={completedActivities[item.id]}
                activity={item as ActivityEntity}
                isActive={index === currentActiveIndex}
                lessonResponseId={lessonResponseId}
              />
            )}
          </StepCard>
        </YStack>
      )}
    />
  );
};
