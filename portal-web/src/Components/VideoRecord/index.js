//Imports react
import RecordRTC, { RecordRTCPromisesHandler } from 'recordrtc';
import { useState } from 'react';

export default function VideoRecord() {
    const [recorder, setRecorder] = useState();
    const [stream, setStream] = useState();
    const [videoBlob, setVideoBlob] = useState();

    const startRecording = async () => {
        const mediaDevices = navigator.mediaDevices
        const stream = await mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        const recorder = new RecordRTCPromisesHandler(stream, {
            type: 'video',
        });

        await recorder.startRecording();
        setRecorder(recorder);
        setStream(stream);
        setVideoBlob(null);
    }

    const stopRecording = async () => {
        if (recorder) {
            await recorder.stopRecording();
            const blob = await recorder.getBlob();
            stream.stop();
            setVideoBlob(window.URL.createObjectURL(blob));
            console.log(window.URL.createObjectURL(blob));
            setStream(null);
            setRecorder(null);
        }
    }

    return (
        <>
            <button onClick={startRecording}> record </button>
            <button onClick={stopRecording}> Stop record </button>
            <video autoPlay muted src={videoBlob} />
        </>
    );
}