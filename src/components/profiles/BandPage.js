import { useEffect, useState } from "react"
import { Fetch, Method } from "../ApiManager"
import { Link, useParams } from "react-router-dom"
import { Post } from "../feed/Post"
import "./BandPage.css"
import favoriteBandIcon from "../img/Favorite_Icon.png"
import unfavoriteBandIcon from "../img/NotFavorite_Icon.png"

export const BandPage = () => {
    const localSgUser = localStorage.getItem("sg_user")
    const sgUserObject = JSON.parse(localSgUser)

    const { bandId } = useParams()

    const [band, setBand] = useState([])
    const [feed, setFeed] = useState([])
    const [favorites, setFavorites] = useState([])
    const favoriteInfoToSendToAPI = {
        userId: sgUserObject.id,
        postId: 0,
        bandId: parseInt(bandId)
    }

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
        }, [bandId]
    )

    const getPosts = () => {
        Fetch("posts", postsSortNewExpandUserURL,)
            .then((postsArray) => { setFeed(postsArray) })
    }

    useEffect(
        () => {
            getPosts()
        }, [bandId])

    const getFavorites = () => {
        Fetch("favorites", "",)
            .then((favoritesArray) => { setFavorites(favoritesArray) })
    }

    useEffect(() => { getFavorites() }, [bandId])

    let favoriteIcon = unfavoriteBandIcon
    favorites.map(favorite => {
        if (favorite.bandId === parseInt(bandId) && favorite.userId === sgUserObject.id && favorite.postId === 0) {
            favoriteIcon = favoriteBandIcon
        }
    })

    let favoriteBandValue = () => {
        let favoriteBandId = 0
        let favoriteUserId = 0
        let favoriteId = 0
        favorites.map(favorite => {
            if (favorite.bandId === parseInt(bandId) && favorite.userId === sgUserObject.id && favorite.postId === 0) {
                favoriteBandId = favorite.bandId
                favoriteUserId = favorite.userId
                favoriteId = favorite.id
            }
        })
        if (favoriteBandId === parseInt(bandId) && favoriteUserId === sgUserObject.id) {
            Fetch("favorites/", favoriteId, Method("DELETE"))
                .then(() => getFavorites())
        } else {
            Fetch("favorites", "", Method("POST", favoriteInfoToSendToAPI))
                .then(() => getFavorites())
        }
    }

    return (
        <article className="main">
            <section className="band__page">
                <div className="band__nameGroup">
                    <div className="band__name">{band.name}</div>
                    <div className="band__managerFavorite" value={bandId} onClick={favoriteBandValue}>
                        <img className="band__managerFavoriteImg" src={favoriteIcon} alt="Favorite" />
                    </div>
                </div>
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
}