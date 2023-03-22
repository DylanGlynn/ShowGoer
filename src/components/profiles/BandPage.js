import { useEffect, useState } from "react"
import { Fetch, Method } from "../ApiManager"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Post } from "../feed/Post"
import "./BandPage.css"

export const BandPage = () => {
    const localSgUser = localStorage.getItem("sg_user")
    const sgUserObject = JSON.parse(localSgUser)

    const { bandId } = useParams()

    const [band, setBand] = useState([])
    const [feed, setFeed] = useState([])

    const postsSortNewExpandUserURL = `?_sort=id&_order=desc&_expand=user&_expand=band&NSFW=false&bandId=${bandId}`
    const bandIdURL = `?&id=${bandId}`

    const getBands = () => {
        Fetch("bands", bandIdURL,)
            .then((data) => {
                const singleBand = data[0]
                setBand(singleBand)
            })
    }

    useEffect(
        () => {
            getBands()
        },[]
    )

    const getPosts = () => {
        Fetch("posts", postsSortNewExpandUserURL,)
            .then((postsArray) => { setFeed(postsArray) })
    }

    useEffect(
        () => {
            getPosts()
        }, [bandId])

    return (
        <article className="main">
            <section className="band__page">
                <div className="band__name">{band.name}</div>
                <div className="band__genreLocation">{band.genre} from {band.from}</div>
                <div className="band__members">{band.members}</div>
                <Link to={band.website} target="new"><div className="band__website">{band.website}</div></Link>
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

    return <></>
}