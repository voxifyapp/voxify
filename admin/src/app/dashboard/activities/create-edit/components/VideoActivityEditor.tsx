import { Button, Stack, TextField } from '@mui/material';
import { VideoActivity, VideoActivityData } from '@packages/activity-builder';
import { useEffect, useRef, useState } from 'react';

export default function VideoActivityEditor({
  onActivityDataChange,
  currentData,
}: {
  onActivityDataChange: (data: object) => any;
  currentData?: VideoActivityData;
}) {
  const [videoFileName, setVideoFileName] = useState('');

  useEffect(() => {
    if (currentData) {
      setVideoFileName(currentData.videoFileName);
    }
  }, [currentData]);

  const build = () => {
    const videoActivity = new VideoActivity();
    videoActivity.setVideoFileName(videoFileName);
    try {
      const activityData = videoActivity.build();
      onActivityDataChange(activityData);
      alert('Saved!');
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <Stack spacing={2} padding={2}>
      <TextField
        value={videoFileName}
        onChange={e => setVideoFileName(e.target.value)}
        helperText="(Do not include the extension)"
        label="Video File Name"
      />
      <div>{<Button onClick={() => build()}>Save</Button>}</div>
    </Stack>
  );
}
