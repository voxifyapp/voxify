import { Circle } from "@tamagui/lucide-icons";
import { useQuery } from "@tanstack/react-query";
import {
  GET_COURSE_FOR_PROFILE,
  getCourseForProfile,
} from "@voxify/api/auth/profile";
import {
  GET_UNITS_WITH_LESSON_COMPLETION,
  getUnitsWithLessonCompletion,
} from "@voxify/api/lms-progress/lesson-response";
import React, { useEffect, useRef } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Card, H1, Paragraph, Spacer, Text } from "tamagui";
import Voice from "@react-native-voice/voice";
import {
  GET_UNIT_RESPONSE,
  getUnitResponse,
} from "@voxify/api/lms-progress/unit-response";
// import {
//   ProgressActions,
//   ProgressState,
//   useProfileProgressStore,
// } from "@voxify/modules/main/screens/useProfileProgressStore";
import { Screen } from "@voxify/design_system/layout";
import { ProfileProgressByUnit } from "@voxify/types/lms-progress/profile-progress";
import { Link, router } from "expo-router";

type Props = {};

export default function Home({}: Props) {
  // const [setProfileProgress, completedUnits, setCompletedUnits] =
  //   useProfileProgressStore((state: ProgressState & ProgressActions) => [
  //     state.setProfileProgress,
  //     state.completedUnits,
  //     state.setCompletedUnits,
  //   ]);

  const { data: courseData, isLoading: isCourseLoading } = useQuery({
    queryFn: getCourseForProfile,
    queryKey: [GET_COURSE_FOR_PROFILE],
  });

  useEffect(() => {
    (async () => {
      Voice.onSpeechStart = (e) => {
        console.log("onSpeechStart");
      };
      Voice.onSpeechRecognized = (result) => {
        console.log(result);
      };

      Voice.onSpeechPartialResults = (result) => {
        console.log(result);
      };

      Voice.onSpeechResults = (result) => {
        console.log(result);
      };

      Voice.onSpeechError = (err) => {
        console.error(err);
      };

      Voice.onSpeechEnd = (error) => {
        console.log("onSpeechEnd", error);
      };

      console.log("Voice.start");
      Voice.start("en-US");
    })();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const courseId = courseData && courseData.id;

  const { data: lessonResponse, isLoading: isLessonResponseLoading } = useQuery(
    {
      queryFn: getUnitsWithLessonCompletion.bind(null, courseId),
      queryKey: [GET_UNITS_WITH_LESSON_COMPLETION, courseId],
      enabled: !!courseId,
      // onSuccess: (data: ProfileProgressResult) => {
      //   const unitData: ProfileProgress = {};
      //   data.result.map((profileCompletion) => {
      //     unitData[profileCompletion.id] = profileCompletion.lessonsWithStatus;
      //   });
      //   setProfileProgress(unitData);
      // },
    }
  );

  const { data: unitResponses, isLoading: isUnitResponsesLoading } = useQuery({
    queryFn: getUnitResponse,
    queryKey: [GET_UNIT_RESPONSE],
  });

  // useEffect(() => {
  //   !!unitResponses &&
  //     setCompletedUnits(
  //       new Set<string>(
  //         unitResponses.map((unitResponse) => unitResponse.unitId)
  //       )
  //     );
  // }, [setCompletedUnits, unitResponses]);

  // const nextActivityToCompleteIndex =
  //   (lessonResponse &&
  //     lessonResponse.result.findIndex(
  //       (unit) => !completedUnits.has(unit.id)
  //     )) ||
  //   -1;

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (nextActivityToCompleteIndex !== -1) {
  //       listRef.current?.scrollToIndex({
  //         animated: false,
  //         index: nextActivityToCompleteIndex,
  //       });
  //     }
  //   }, 1000);
  // }, [nextActivityToCompleteIndex]);

  const listRef = useRef<FlatList<ProfileProgressByUnit>>(null);

  if (isCourseLoading || isLessonResponseLoading || isUnitResponsesLoading) {
    return <H1>Loading..</H1>;
  }

  const getLessonsFromUnit = (unit: ProfileProgressByUnit) => {
    const unitId = unit.id;
    const unitLessons = unit.lessonsWithStatus
      .sort((lesson1, lesson2) => lesson1.order - lesson2.order)
      .filter((l) => !!l);
    return unitLessons.map((lesson) => (
      <View key={lesson.id} style={styles.lessonContainer}>
        <Circle size="$1" style={styles.circle} />
        <Link href={`/lesson/${lesson.id}`} replace>
          <Text>{lesson.title}</Text>
        </Link>
      </View>
    ));
  };

  return (
    <Screen>
      <FlatList
        contentContainerStyle={{ marginTop: 20 }}
        ref={listRef}
        data={lessonResponse?.result}
        ItemSeparatorComponent={() => <Spacer size={300} />}
        keyExtractor={(unitWithLessons) => unitWithLessons.id}
        renderItem={({ item: unitWithLessons, index }) => (
          <View>
            <Card>
              <Card.Header padded>
                <Paragraph>Day {index + 1}</Paragraph>
                <Spacer size={20} />
                {getLessonsFromUnit(unitWithLessons)}
              </Card.Header>
            </Card>
          </View>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  lessonContainer: {
    flexDirection: "row",
  },
  circle: {
    marginRight: 10,
  },
});
