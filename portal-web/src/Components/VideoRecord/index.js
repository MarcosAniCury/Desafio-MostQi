//Imports react
import RecordRTC from 'recordrtc';
import { useState, useRef } from 'react';

export default function VideoRecord({ setVideoBlob }) {
    const [recorder, setRecorder] = useState();
    const [displayCamera, setDisplayCamera] = useState(false);
    const videoElement = useRef(null);

    const captureCamera = callback => {
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
                video: {
                    width: {
                        ideal: 1920
                    },
                    height: {
                        ideal: 1080
                    },
                    frameRate: {
                        ideal: 60
                    },
                    facingMode: `environment`
                }
            })
            .then(camera => {
                callback(camera);
            })
            .catch(error => {
                alert(error.message);
            });
    };

    const startRecording = async () => {
        setDisplayCamera(true);
        setVideoBlob(null);
        captureCamera(camera => {
            videoElement.current.srcObject = camera;
            const recordRTC = RecordRTC(camera, {
                type: `video`
            });
            recordRTC.startRecording();
            recordRTC.camera = camera;
            videoElement.current.play();
            setRecorder(recordRTC);
        });
    }

    const stopRecording = async () => {
        if (recorder) {
            recorder.stopRecording(() => {
                videoElement.current.src = videoElement.current.srcObject = null;
                setVideoBlob(recorder.getBlob());
                recorder.destroy();
                setRecorder(null);
                recorder.camera.stop();       
                setDisplayCamera(false);
            });            
        }
    };

    return (
        <>
            <button onClick={startRecording}> record </button>
            <button onClick={stopRecording}> Stop record </button>
            {displayCamera && <video
                playsInline
                muted
                autoPlay
                ref={videoElement}
                style={{ width: `70vw` }}
            />}
        </>
    );
}