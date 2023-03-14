import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Fetch, FetchExternal, Method } from "../ApiManager"
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

        const postToSendToCloudinaryAPI = {
            src: newPost.src
        }

        fetch(`https://res.cloudinary.com/dwnxftunt/image/upload/v1678731459/ShowGoer/`, {
            method: "POST",
            body: newPost.src
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                document.getElementById("data").innerHTML += data;
            });

        const postToSendToAPI = {
            //src: newPost.src,
            userId: sgUserObject.id,
            bandId: parseInt(newPost.bandId),
            venue: newPost.venueName,
            showDate: newPost.showDate,
            uploadDate: new Date().toISOString(),
            memories: newPost.memories,
            SFW: newPost.SFW
        }

        return Fetch("posts", "", Method("POST", postToSendToAPI))
            .then(() => { navigate("/") })
    }

    const cancelPost = () => {
        navigate("/")
    }

    return (
        <form className="newPost__form" onSubmit={handlePublishButtonClick}>
            <div className="newPost__header">Let's share that awesome concert photo!</div>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="imgSrc"></label>
                    <input
                        required autoFocus
                        type="file"
                        className="form-control"
                        placeholder="Select that concert photo!"
                        value={newPost.src}
                        onChange={(evt) => {
                            const copy = { ...newPost }
                            copy.src = evt.target.value
                            setNewPost(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="bandId"></label>
                    <select
                        required
                        className="form-control"
                        value={newPost.bandId}
                        onChange={(evt) => {
                            const copy = { ...newPost }
                            copy.bandId = evt.target.value
                            setNewPost(copy)
                        }}>
                        <option value="">You saw WHAT band!?!?</option>
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
                        value={newPost.venueName}
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
                        value={newPost.showDate}
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
                        value={newPost.memories}
                        placeholder="Any memories from the show?"
                        onChange={(evt) => {
                            const copy = { ...newPost }
                            copy.memories = evt.target.value
                            setNewPost(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group sfw">
                    <input
                        type="checkbox"
                        id="SFW"
                        className="form-control sfw__box"
                        onChange={(evt) => {
                            const copy = { ...newPost }
                            copy.SFW = evt.target.checked
                            setNewPost(copy)
                        }} />
                    <label htmlFor="sfw__text">Safe for viewing at work!</label>
                </div>
            </fieldset>
            <fieldset>
                <button className="button__submit" type="submit">Post it, now!</button>
                <button className="button__cancel" type="cancel" onClick={cancelPost}>On second thought...</button>
            </fieldset>
        </form>
    )
}