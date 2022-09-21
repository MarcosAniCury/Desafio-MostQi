//Imports react
import { RecordRTCPromisesHandler } from 'recordrtc';
import { useCallback, useState } from 'react';

export default function VideoRecord({ setVideoBase64, setVideoURL }) {
    const [recorder, setRecorder] = useState();
    const [stream, setStream] = useState();

    const startRecording = useCallback(async () => {
        const mediaDevices = navigator.mediaDevices
        const stream = await mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        const recorder = new RecordRTCPromisesHandler(stream, {
            type: 'video',
        });

        await recorder.startRecording();
        await setRecorder(recorder);
        setStream(stream);
        setVideoURL(null);
    }, [recorder, stream]);

    const stopRecording = async () => {
        if (recorder) {
            await recorder.stopRecording();
            const videoBase64 = await recorder.getDataURL();
            const blob = await recorder.getBlob();
            setVideoBase64(videoBase64);
            setVideoURL(window.URL.createObjectURL(blob));
            stream.stop();
            setStream(null);
            setRecorder(null);
        }
    }

    return (
        <>
            <button onClick={startRecording}> record </button>
            <button onClick={stopRecording}> Stop record </button>
        </>
    );
}