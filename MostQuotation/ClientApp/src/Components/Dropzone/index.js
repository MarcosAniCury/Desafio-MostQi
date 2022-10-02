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

export default function MyDropzone({ text, onDrop, imageShow, iconShow, size = 1048576 }) {
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        setShowImage(!!imageShow);
    }, [imageShow]);

    return (
        <Dropzone
            onDrop={onDrop}
            accept={{ "image/*": ['.png', '.gif', '.jpeg', '.jpg'] }}
            minSize={0}
            maxSize={size}>
            {({ getRootProps, getInputProps }) => (
                <ContainerDropzone {...getRootProps()} showImage={showImage}>
                    <input {...getInputProps()}
                        accept="image/*"
                        minSize={0}
                        maxSize={size} />
                    {
                        showImage ?
                            <Img src={imageShow} /> :
                            <ContainerItems>
                                {iconShow && <IconExport className={iconShow} />}
                                <SpanDescription>{text} </SpanDescription>
                            </ContainerItems>
                    }
                </ContainerDropzone>
            )}
        </Dropzone>
    )
}