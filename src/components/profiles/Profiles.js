import { useEffect, useState } from "react"
import { Fetch, FetchExternal, Method } from "../ApiManager"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Cloudinary } from '@cloudinary/url-gen'
import { Resize } from '@cloudinary/url-gen/actions'
import "../feed/Feed.css"
import "./Profiles.css"
import { Post } from "../feed/Post"
import LargeProfileIcon from "../img/Profile_LargeIcon.png";

export const Profile = () => {
    const localSgUser = localStorage.getItem("sg_user")
    const sgUserObject = JSON.parse(localSgUser)

    const navigate = useNavigate()

    const { userId } = useParams()

    const [user, setUser] = useState([])
    const [feed, setFeed] = useState([])

    const postsSortNewExpandThisUserURL = `?_sort=uploadDate&_order=desc&_expand=user&_expand=band&userId=${sgUserObject.id}`
    const userIdURL = `?&id=${sgUserObject.id}`

    useEffect(
        () => {
            Fetch("users", userIdURL,)
                .then((data) => {
                    const singleClient = data[0]
                    setUser(singleClient)
                })
        }, [])

    useEffect(
        () => {
            Fetch("posts", postsSortNewExpandThisUserURL,)
                .then((postsArray) => { setFeed(postsArray) })
        }, [])

    return (
        <article className="main">
            <section className="profile">
                <div>
                    <img className="profile__iconLarge" src={LargeProfileIcon} />
                </div>
                <div className="profile__details">
                    <h2 className="profile__infoHeader">My Info</h2>
                    <article className="profile__personalInfo" key={`profile--${user?.id}`}>
                        <div className="profile__name"><em>name</em>{user?.firstName} {user?.lastName}</div>
                        <div className="profile__email"><em>email address</em>{user?.email}</div>
                        <div className="profile__location"><em>current location</em>{user?.location}.</div>
                        <Link className="profile__logout" to="" onClick={() => {
                            localStorage.removeItem("sg_user")
                            navigate("/", { replace: true })
                        }}>{`[ please, log me out! ]`}</Link>
                    </article>
                </div>
            </section>
            <section className="feed">
                <h2 className="feed__header">My Feed</h2>
                {
                    feed.map(post => <Post
                        key={`post--${post.id}`}
                        id={post.id}
                        userId={post.userId}
                        bandName={post?.band?.name}
                        firstName={post?.user?.firstName}
                        lastName={post?.user?.lastName}
                        imgURL={post.src}
                        venueName={post.venue}
                        showDate={post.showDate}
                        memories={post.memories}
                    />)
                }
            </section>
        </article>
    )
}