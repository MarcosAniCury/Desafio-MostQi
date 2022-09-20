//Imports react
import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

//Styles
import {
    IconExport,
    SpanDescription,
    ContainerDropzone,
    ContainerItems,
    Img
} from './styles.js';

export default function MyDropzone({ text, onDrop, imageShow }) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: "image/*" })

    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        setShowImage(!!imageShow);
    }, [imageShow]);

    return (
        <ContainerDropzone {...getRootProps()} showImage={showImage}>
            <input {...getInputProps()} accept="image/*" />
            {
                showImage ?
                    <Img src={imageShow} /> :
                    <ContainerItems>
                        <IconExport className="fa-solid fa-upload" />
                        <SpanDescription> {text} </SpanDescription>
                    </ContainerItems>
            }
        </ContainerDropzone>
    )
}