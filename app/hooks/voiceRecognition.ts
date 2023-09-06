import Voice, { SpeechResultsEvent } from '@react-native-voice/voice';
import { useEffect, useState } from 'react';

export const useVoiceRecognition = ({
  onResults,
  onSpeechRealtimeRecognition,
}: {
  onResults: (recognizedWords: string) => void;
  onSpeechRealtimeRecognition: (recognizedWords: string) => void;
}) => {
  const [started, setStarted] = useState(false);

  const onSpeechStart = () => {
    setStarted(true);
  };

  const onSpeechEnd = () => {
    setStarted(false);
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    e.value?.length && onResults(e.value[0]);
  };

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    e.value?.length && onSpeechRealtimeRecognition(e.value[0]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    started,
    Voice,
  };
};
