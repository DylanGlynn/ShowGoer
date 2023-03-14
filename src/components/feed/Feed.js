import { useEffect, useState } from "react"
import { Fetch, FetchExternal, Method } from "../ApiManager"
import { Link, useNavigate } from "react-router-dom"
import { Cloudinary } from '@cloudinary/url-gen'
import { Resize } from '@cloudinary/url-gen/actions'
import "./Feed.css"
import { Post } from "./Post"

export const Feed = () => {
    const localSgUser = localStorage.getItem("sg_user")
    const sgUserObject = JSON.parse(localSgUser)

    const cldInstance = new Cloudinary({ cloud: { cloudName: 'dwnxftunt' } })

    const [feed, setFeed] = useState([])

    const postsSortNewExpandUserURL = `?_sort=uploadDate&_expand=user&_expand=band`

    useEffect(
        () => {
            Fetch("posts", postsSortNewExpandUserURL,)
                .then((postsArray) => { setFeed(postsArray) })
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