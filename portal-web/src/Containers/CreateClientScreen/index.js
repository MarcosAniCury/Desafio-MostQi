//React import
import React, { useState } from 'react'
import Cropper from 'react-easy-crop'

//Utils
import { getBase64 } from '../../Utils/Utils.js';

export default function CreateClientScreen() {
    const [inputImg, setInputImg] = useState();

    return (
        <>
            <input
                type='file'
                accept='image/*'
                onChange={e => getBase64(e.target.files[0], setInputImg)}
            />
            {inputImg &&
                <img src={inputImg}/>}
        </>
    );
}