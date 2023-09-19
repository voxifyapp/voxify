import VideoActivityEditor from '@/app/dashboard/activities/create-activity/components/VideoActivityEditor';
import { ActivityType } from '@/types/lms';
import { Box } from '@mui/material';

export default function ActivityEditor({
  type,
  onActivityDataChange
}: {
  type: ActivityType;
  onActivityDataChange: (data: object) => any;
}) {
  const render = () => {
    if (type === ActivityType.VIDEO) {
      return (
        <VideoActivityEditor onActivityDataChange={onActivityDataChange} />
      );
    }
    return null;
  };

  return <Box border={2}>{render()}</Box>;
}
