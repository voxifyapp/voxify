import Voice, { SpeechResultsEvent } from '@react-native-voice/voice';
import { useEffect, useState } from 'react';


export const useVoiceRecognition = (
  { recordAudio }: { recordAudio?: boolean } = { recordAudio: false },
) => {
  const [started, setStarted] = useState(false);
  const [recognized, setRecognized] = useState<string>('');
  // let audioRecorderPlayer = useRef<AudioRecorderPlayer>(
  //   new AudioRecorderPlayer(),
  // ).current;
  // let firstRun = useRef(true);

  // useEffect(() => {
  //   if (recordAudio) {
  //     (async () => {
  //       try {
  //         if (started) {
  //           await audioRecorderPlayer.startRecorder(
  //             undefined,
  //             {
  //               AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
  //               AudioSourceAndroid: AudioSourceAndroidType.MIC,
  //               AVModeIOS: AVModeIOSOption.measurement,
  //             },
  //             false,
  //           );
  //         } else {
  //           if (!firstRun.current) {
  //             const result = await audioRecorderPlayer.stopRecorder();
  //             console.log(result);
  //           }
  //         }
  //       } catch (err) {
  //         console.error(err);
  //       }
  //       firstRun.current = false;
  //     })();
  //   }
  // }, [started, audioRecorderPlayer, recordAudio]);

  const onSpeechStart = async () => {
    setStarted(true);
  };

  const onSpeechEnd = () => {
    setStarted(false);
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    // TODO Set recognized to this value
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
