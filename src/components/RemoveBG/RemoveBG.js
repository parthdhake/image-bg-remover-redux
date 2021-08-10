import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { setActionStatus } from '../../features/removebg/removebgSlice';
import loadImage from "blueimp-load-image";
import "./RemoveBG.css";
import ReactLoading from 'react-loading';

export default function RemoveBG() {


    const status = useSelector((state) => state.status.bgRemoved);
    const dispatch = useDispatch();

    let b =null

    const [image, setImage] = useState(null);

    const downloadBlob = (blob, name = 'file.png') => {
        if (
        window.navigator && 
        window.navigator.msSaveOrOpenBlob
        ) return window.navigator.msSaveOrOpenBlob(blob);

        // For other browsers:
        // Create a link pointing to the ObjectURL containing the blob.
        const data = blob;

        const link = document.createElement('a');
        link.href = data;
        link.download = name;

        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(
            new MouseEvent('click', { 
                bubbles: true, 
                cancelable: true, 
                view: window 
            })
        );

        setTimeout(() => {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
        link.remove();
        }, 100);
    }
    const imgUpload = (e) => {
        const i = e.target.files[0];
        setImage(i);
        console.log(i);
    }

    const uploadImage = async () => { 

        dispatch(setActionStatus(false));

        const resizedImage = await loadImage(image, {
        // resize before sending to PhotoRoom for performance
        maxWidth: 1500,
        maxHeight: 1500,
        canvas: true
        });

        resizedImage.image.toBlob(async function (inputBlob) {
        const formData = new FormData();
        formData.append("image_file", inputBlob);

        const response = await fetch("https://sdk.photoroom.com/v1/segment", {
            method: "POST",
            headers: {
            "x-api-key": "f6a35b3f209ecdcd2f693a5c150347384053e580"
            },
            body: formData
        });

        if(response.status === 200) {
            dispatch(setActionStatus(true));
        }
        else{
            dispatch(setActionStatus(false));
        }


        // https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api#example_fetching_images
        const outputBlob = await response.blob();

        b = URL.createObjectURL(outputBlob);
        const image = document.getElementById("result")
        image.src = b;
        console.log(b);
        });
    }

    return (
        <div className="main">
            <div className="input">
                <input type="file" onChange={imgUpload} />
                <button onClick={uploadImage}>Remove Background</button>
            </div>
            <div>
                {status ? <div className="image">
                    <img id="result" src={b} />
                    {/* <a href={b} download>Click to download</a>

                    <button onClick={downloadBlob.bind(this, b)}></button> */}
                 </div>: null}
                {status === false ? <ReactLoading id="loading" type="spin" color="#000000" height={100} width={100} /> : null} 
            </div>

        </div>
    )
}
