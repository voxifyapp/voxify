import VideoActivityEditor from '@/app/dashboard/activities/create-activity/components/VideoActivityEditor';
import { ActivityType } from '@/types/lms';
import { Box } from '@mui/material';

export default function ActivityEditor({ type }: { type: ActivityType }) {
  const render = () => {
    if (type === ActivityType.VIDEO) {
      return <VideoActivityEditor />;
    }
    return null;
  };

  return <Box border={2}>{render()}</Box>;
}
