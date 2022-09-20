//Imports react
import React, { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';

//Styles
import {
    IconExport,
    SpanDescription,
    ContainerDropzone,
    ContainerItems,
    Img
} from './styles.js';

export default function MyDropzone({ text, onDrop, imageShow, size = 1048576 }) {
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        setShowImage(!!imageShow);
    }, [imageShow]);

    return (
        <Dropzone
            onDrop={onDrop}
            accept="image/*"
            minSize={0}
            maxSize={size}>
            {({ getRootProps, getInputProps, rejectedFiles }) => (
                <ContainerDropzone {...getRootProps()} showImage={showImage}>
                    <input {...getInputProps()}
                        accept="image/*"
                        minSize={0}
                        maxSize={size} />
                    {
                        showImage ?
                            <Img src={imageShow} /> :
                            <ContainerItems>
                                <IconExport className="fa-solid fa-upload" />
                                <SpanDescription>{text} </SpanDescription>
                            </ContainerItems>
                    }
                </ContainerDropzone>
            )}
        </Dropzone>
    )
}