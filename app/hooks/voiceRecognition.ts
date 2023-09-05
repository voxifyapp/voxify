import Voice, { SpeechResultsEvent } from '@react-native-voice/voice';
import { useEffect, useState } from 'react';

export const useVoiceRecognition = (
  {}: { recordAudio?: boolean } = { recordAudio: false },
) => {
  const [started, setStarted] = useState(false);
  const [recognized, setRecognized] = useState<string>('');

  const onSpeechStart = () => {
    setStarted(true);
  };

  const onSpeechEnd = () => {
    setStarted(false);
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    e.value?.length && setRecognized(e.value[0]);
  };

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    e.value?.length && setRecognized(e.value[0]);
  };

  const onSpeechError = () => {
    setStarted(false);
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return {
    started,
    recognized,
    Voice,
  };
};
