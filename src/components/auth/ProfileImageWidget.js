import { useEffect, useRef } from "react";

export const ProfileImageUploadWidget = (setImageURL) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: `${process.env.REACT_APP_CLOUD_NAME}`,
            uploadPreset: `${process.env.REACT_APP_UPLOAD_PRESET_PROFILE}`
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
                    Your profile image!
                </button>
            </div>
        </fieldset>
    )
}