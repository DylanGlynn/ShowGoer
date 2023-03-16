import { useEffect, useRef } from "react";

export const UploadWidget = (setImageURL) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: `${process.env.REACT_APP_CLOUD_NAME}`,
            uploadPreset: `${process.env.REACT_APP_UPLOAD_PRESET}`
        }, function (error, result) {
            if (result.event === "success") {
                setImageURL(result.info.url)
            }
        });
    }, [])
    return (
        <fieldset>
            <div className="form-group">
                <button className="form-control" onClick={() => widgetRef.current.open()} >
                    {(widgetRef) ? "Select image to upload!" : "Your image is ready!"}
                </button>
            </div>
        </fieldset>
    )
}

/* 
    cloudinary.imageTag('ShowGoer/yghvzott3c2phfwk6sy8.heic').toHtml();
    info.sercure_url (for https) or info.url (for http) = the URL for the file being uploaded. Need to pull to 
    newPost.src to save to database.
*/