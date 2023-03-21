import { useEffect, useState } from "react"
import { Fetch, FetchExternal, Method } from "../ApiManager"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Cloudinary } from '@cloudinary/url-gen'
import { Resize } from '@cloudinary/url-gen/actions'
import "../feed/Feed.css"
import "./Profiles.css"
import { Post } from "../feed/Post"
import LargeProfileIcon from "../img/Profile_LargeIcon.png";
import deletePostIcon from "../img/DeletePost_Icon.png"

export const UserPage = () => {
    const localSgUser = localStorage.getItem("sg_user")
    const sgUserObject = JSON.parse(localSgUser)

    const navigate = useNavigate()

    const { userId } = useParams()

    const [user, setUser] = useState([])
    const [feed, setFeed] = useState([])

    const postsSortNewExpandThisUserURL = `?_sort=id&_order=desc&_expand=user&_expand=band&userId=${userId}`
    const userIdURL = `?&id=${userId}`

    let ProfileIconImage = LargeProfileIcon
    user.profileImageURL ? ProfileIconImage = user.profileImageURL : ProfileIconImage = LargeProfileIcon
    
    useEffect(
        () => {
            Fetch("users", userIdURL,)
                .then((data) => {
                    const singleClient = data[0]
                    setUser(singleClient)
                })
        }, [])

    const getPosts = () => {
        Fetch("posts", postsSortNewExpandThisUserURL,)
            .then((postsArray) => { setFeed(postsArray) })
    }

    useEffect(
        () => {
            getPosts()
        }, [])

    return (
        <article className="profile__main">
            <section className="profile">
                <div>
                    <img className="profile__iconLarge" src={ProfileIconImage} />
                </div>
                <div className="profile__details">
                    <h2 className="profile__infoHeader">{user.id === sgUserObject.id ? `My Info` : `${user.firstName}'s Info`}</h2>
                    <article className="profile__personalInfo" key={`profile--${user?.id}`}>
                        <div className="profile__name"><em>name</em>{user?.firstName} {user?.lastName}</div>
                        <div className="profile__email"><em>email address</em>{user?.email}</div>
                        <div className="profile__location"><em>current location</em>{user?.location}.</div>
                        {user.id === sgUserObject.id ? <Link className="profile__logout" to="" onClick={() => {
                            localStorage.removeItem("sg_user")
                            navigate("/", { replace: true })
                        }}>{`[ please, log me out! ]`}</Link> : ""}
                    </article>
                </div>
            </section>
            <section className="feed">
                <h2 className="feed__header">{user.id === sgUserObject.id ? `My Feed` : `${user.firstName}'s Feed`} <em>{feed.length} {feed.length === 1 ? `post` : `posts`}</em></h2>
                {
                    feed.map(post => <Post
                        key={`post--${post.id}`}
                        id={post.id}
                        userId={post.userId}
                        bandId={post?.band.id}
                        bandName={post?.band?.name}
                        firstName={post?.user?.firstName}
                        lastName={post?.user?.lastName}
                        imgURL={post.src}
                        venueName={post.venue}
                        showDate={post.showDate}
                        uploadDate={post.uploadDate}
                        nsfwValue={post.NSFW}
                        activeProfile={sgUserObject.id}
                        memories={post.memories}
                        getPosts={getPosts}
                        profileImage={ProfileIconImage}
                    />)
                }
            </section>
        </article>
    )
}