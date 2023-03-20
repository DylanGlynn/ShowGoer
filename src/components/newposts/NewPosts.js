import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Fetch, Method } from "../ApiManager"
import { UploadWidget } from "./UploadWidget"
import "./NewPosts.css"

export const NewPosts = () => {
    const localSgUser = localStorage.getItem("sg_user")
    const sgUserObject = JSON.parse(localSgUser)

    const [bands, setBands] = useState([])
    const [newPost, setNewPost] = useState({
        src: "",
        userId: 0,
        bandId: 0,
        venueName: "",
        showDate: "",
        uploadDate: "",
        memories: "",
        SFW: false
    })

    const [imageURL, setImageURL] = useState(``)

    const navigate = useNavigate()

    useEffect(
        () => {
            Fetch("bands", "?_sort=name")
                .then(foundBands => {
                    setBands(foundBands)
                })
        }, []
    )

    const handlePublishButtonClick = (event) => {
        event.preventDefault()

        const postToSendToAPI = {
            src: imageURL,
            userId: sgUserObject.id,
            bandId: parseInt(newPost.bandId),
            venue: newPost.venueName,
            showDate: newPost.showDate,
            uploadDate: new Date().toLocaleDateString(),
            memories: newPost.memories,
            NSFW: newPost.NSFW
        }

        return Fetch("posts", "", Method("POST", postToSendToAPI))
            .then(() => { navigate("/") })
    }

    const cancelPost = () => {
        navigate("/")
    }

    return (
        <section className="newPost">
            <form className="newPost__form" onSubmit={handlePublishButtonClick}>
                <div className="newPost__header">Let's share that awesome concert photo!</div>
                {UploadWidget(setImageURL)}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="bandId"></label>
                        <select
                            required
                            className="form-control"
                            value={newPost?.bandId}
                            onChange={(evt) => {
                                const copy = { ...newPost }
                                copy.bandId = evt.target.value
                                setNewPost(copy)
                            }}>
                            <option value="">You saw WHICH band!?!?</option>
                            {bands.map(band => (
                                <option value={band.id} key={band.id}>{band.name}
                                </option>))}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="venueName"></label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            value={newPost?.venueName}
                            placeholder="Where was this?"
                            onChange={(evt) => {
                                const copy = { ...newPost }
                                copy.venueName = evt.target.value
                                setNewPost(copy)
                            }} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group" id="dateForm">
                        <label htmlFor="showDate"></label>
                        <input
                            required
                            type="date"
                            className="form-control"
                            value={newPost?.showDate}
                            onChange={(evt) => {
                                const copy = { ...newPost }
                                copy.showDate = evt.target.value
                                setNewPost(copy)
                            }} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="memories"></label>
                        <textarea
                            type="text"
                            className="textform-control"
                            value={newPost?.memories}
                            placeholder="Any memories from the show?"
                            onChange={(evt) => {
                                const copy = { ...newPost }
                                copy.memories = evt.target.value
                                setNewPost(copy)
                            }} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group nsfw">
                        <input
                            type="checkbox"
                            id="NSFW"
                            className="form-control nsfw__box"
                            onChange={(evt) => {
                                const copy = { ...newPost }
                                copy.NSFW = evt.target.checked
                                setNewPost(copy)
                            }} />
                        <label htmlFor="nsfw__text">Hide from public stream?</label>
                    </div>
                </fieldset>
                <fieldset>
                    <button className="button__submit" type="submit">Post it, now!</button>
                    <button className="button__cancel" type="cancel" onClick={cancelPost}>On second thought...</button>
                </fieldset>
            </form>
        </section>
    )
}