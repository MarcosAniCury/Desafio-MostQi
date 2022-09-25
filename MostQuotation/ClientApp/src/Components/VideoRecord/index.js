//Imports react
import RecordRTC from 'recordrtc';
import { useState } from 'react';

//Styles
import {
    ContainerImage,
    VideoShow,
    ContainerButton,
    Icon
} from './styles';

export default function VideoRecord({ videoRef }) {
    const [recorder, setRecorder] = useState();

    const captureCamera = callback => {
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
                video: {
                    width: {
                        ideal: '800'
                    },
                    height: {
                        ideal: '600'
                    },
                    frameRate: {
                        ideal: 30
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

    const startRecording = () => {
        captureCamera(camera => {
            videoRef.current.srcObject = camera;
            const recordRTC = RecordRTC(camera, {
                type: `video`
            });
            recordRTC.startRecording();
            recordRTC.camera = camera;
            videoRef.current.play();
            setRecorder(recordRTC);
        });
    };

    const stopRecording = () => {
        if (recorder) {
            recorder.stopRecording(() => {
                videoRef.current.src = videoRef.current.srcObject = null;
                videoRef.current.blob = recorder.getBlob();
                videoRef.current.src = URL.createObjectURL(videoRef.current.blob);
                recorder.camera.stop();
                recorder.destroy();
                setRecorder(null);
            });
        }
    };

    return (
        <>
            <ContainerButton>
                <Icon className={"fa-solid fa-camera"} onClick={startRecording} />
                <Icon className={"fa-solid fa-camera-slash"} onClick={stopRecording} />
            </ContainerButton>
            <ContainerImage>
                {true && <VideoShow
                    playsInline
                    muted
                    autoPlay
                    ref={videoRef}
                />}
            </ContainerImage>
        </>
    );
}