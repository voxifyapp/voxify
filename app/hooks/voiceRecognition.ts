import Voice, { SpeechResultsEvent } from '@react-native-voice/voice';
import { useEffect, useState } from 'react';

export const useVoiceRecognition = (
  {}: { recordAudio?: boolean } = { recordAudio: false },
) => {
  const [started, setStarted] = useState(false);
  const [recognized, setRecognized] = useState<string>('');

  const onSpeechStart = (e: any) => {
    console.log('onSpeechStart: ', e);
    setStarted(true);
  };

  const onSpeechEnd = (e: any) => {
    console.log('onSpeechEnd: ', e);
    setStarted(false);
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechResults: ', e);
  };

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechPartialResults: ', e);
    setRecognized(e.value![0]);
  };

  const onSpeechError = (e: any) => {
    setStarted(false);
    console.log(e);
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
    start: Voice.start,
    stop: Voice.stop,
  };
};
