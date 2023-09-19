import { Button, Stack, TextField } from '@mui/material';
import { VideoActivity } from '@packages/activity-builder';
import { useEffect, useRef, useState } from 'react';

export default function VideoActivityEditor({
  onActivityDataChange,
}: {
  onActivityDataChange: (data: object) => any;
}) {
  const [videoFileName, setVideoFileName] = useState('');
  const [showSave, setShowSave] = useState(false);
  const firstTimeRef = useRef(true);

  useEffect(() => {
    if (!firstTimeRef.current) {
      setShowSave(true);
    }
    firstTimeRef.current = false;
  }, [videoFileName]);

  const build = () => {
    const videoActivity = new VideoActivity();
    videoActivity.setVideoFileName(videoFileName);
    try {
      const activityData = videoActivity.build();
      onActivityDataChange(activityData);
      setShowSave(false);
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
      <div>{showSave && <Button onClick={() => build()}>Save</Button>}</div>
    </Stack>
  );
}
