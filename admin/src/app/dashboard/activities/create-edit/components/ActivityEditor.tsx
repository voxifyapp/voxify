import MultipleChoiceActivityEditor from '@/app/dashboard/activities/create-edit/components/MultipleChoiceEditor';
import PronunciationActivityEditor from '@/app/dashboard/activities/create-edit/components/PronunciationEditor';
import VideoActivityEditor from '@/app/dashboard/activities/create-edit/components/VideoActivityEditor';
import { ActivityType } from '@/types/lms';
import { Box } from '@mui/material';
import {
  MultipleChoiceActivityData,
  PronunciationActivityData,
  VideoActivityData,
} from '@packages/activity-builder';

export default function ActivityEditor({
  type,
  onActivityDataChange,
  initialData,
}: {
  type: ActivityType;
  initialData?: object;
  onActivityDataChange: (data: object) => any;
}) {
  const render = () => {
    if (type === ActivityType.VIDEO) {
      return (
        <VideoActivityEditor
          currentData={initialData as VideoActivityData | undefined}
          onActivityDataChange={onActivityDataChange}
        />
      );
    }
    if (type === ActivityType.PRONUNCIATION) {
      return (
        <PronunciationActivityEditor
          currentData={initialData as PronunciationActivityData | undefined}
          onActivityDataChange={onActivityDataChange}
        />
      );
    }
    if (type === ActivityType.MULTIPLE_CHOICE) {
      return (
        <MultipleChoiceActivityEditor
          currentData={initialData as MultipleChoiceActivityData | undefined}
          onActivityDataChange={onActivityDataChange}
        />
      );
    }
    return null;
  };

  return <Box border={2}>{render()}</Box>;
}
