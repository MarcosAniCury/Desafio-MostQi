//Imports react
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

//Styles
import {
    IconExport,
    SpanDescription,
    ContainerDropzone,
    ContainerItems
} from './styles.js';

export default function MyDropzone({ text, onDrop }) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <ContainerDropzone {...getRootProps()}>
            <input {...getInputProps()} />
            <ContainerItems>
                <IconExport className="fa-solid fa-upload" />
                <SpanDescription> {text} </SpanDescription>
            </ContainerItems>   
        </ContainerDropzone>
    )
}