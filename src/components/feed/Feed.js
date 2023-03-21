import { useEffect, useState } from "react"
import { Fetch, Method } from "../ApiManager"
import { Link, useNavigate } from "react-router-dom"
import { Cloudinary } from '@cloudinary/url-gen'
import { Resize } from '@cloudinary/url-gen/actions'
import { Post } from "./Post"
import deletePostIcon from "../img/DeletePost_Icon.png"
import "./Feed.css"

export const Feed = () => {
    const localSgUser = localStorage.getItem("sg_user")
    const sgUserObject = JSON.parse(localSgUser)

    const [feed, setFeed] = useState([])

    const postsSortNewExpandUserURL = `?_sort=id&_order=desc&_expand=user&_expand=band&NSFW=false`

    const getPosts = () => {
        Fetch("posts", postsSortNewExpandUserURL,)
            .then((postsArray) => { setFeed(postsArray) })
    }

    useEffect(
        () => {
            getPosts()
        }, [])

    return (
        <article className="main">
            <section className="create__post">
                <Link className="createPost__link" to="/newposts">{`+ Want to share a new photo, ${sgUserObject.firstName}?`}</Link>
            </section>
            <section className="feed">
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
                        memories={post.memories}
                        uploadDate={post.uploadDate}
                        nsfwValue={post.NSFW}
                        activeProfile={sgUserObject.id}
                        getPosts={getPosts}
                        profileImage={post?.user.profileImageURL}
                    />)
                }
            </section>
        </article>
    )
}