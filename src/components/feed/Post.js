import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import hidePostIcon from "../img/HidePost_Icon.png"
import showPostIcon from "../img/ShowPost_Icon.png"
import editPostIcon from "../img/EditPost_Icon.png"
import deletePostIcon from "../img/DeletePost_Icon.png"
import favoritePostIcon from "../img/Favorite_Icon.png"
import unfavoritePostIcon from "../img/NotFavorite_Icon.png"
import { Fetch, Method } from "../ApiManager"

export const Post = (
    {
        id, userId, bandId, bandName, firstName,
        lastName, imgURL, venueName,
        showDate, uploadDate, memories,
        activeProfile, getPosts, nsfwValue
    }) => {

    const [favorites, setFavorites] = useState([])
    const favoriteInfoToSendToAPI = {
        userId: activeProfile,
        postId: id,
        bandId: bandId
    }

    const getFavorites = () => {
        Fetch("favorites", "",)
            .then((favoritesArray) => { setFavorites(favoritesArray) })
    }

    useEffect(() => { getFavorites() }, [])

    const deletePost = () => {
        Fetch("posts/", id, Method("DELETE",))
            .then(() => getPosts())
    }

    let nsfwValueIcon = hidePostIcon
    nsfwValue ? nsfwValueIcon = showPostIcon : nsfwValueIcon = hidePostIcon

    const setNSFW = () => {
        let nsfwToggle = { NSFW: !nsfwValue }
        Fetch("posts/", id, Method("PATCH", nsfwToggle))
            .then(() => getPosts())
    }

    let favoriteIcon = unfavoritePostIcon
    favorites.map(favorite => {
        if (favorite.postId === id && favorite.userId === activeProfile) {
            favoriteIcon = favoritePostIcon
        }
    })

    let favoriteValue = () => {
        let favoritePostId = 0
        let favoriteUserId = 0
        let favoriteId = 0
        favorites.map(favorite => {
            if (favorite.postId === id && favorite.userId === activeProfile) {
                favoritePostId = favorite.postId
                favoriteUserId = favorite.userId
                favoriteId = favorite.id
            }
        })
        if (favoritePostId === id && favoriteUserId === activeProfile) {
            Fetch("favorites/", favoriteId, Method("DELETE"))
                .then(() => getFavorites())
        } else {
            Fetch("favorites", "", Method("POST", favoriteInfoToSendToAPI))
                .then(() => getFavorites())
        }
    }

    return (
        <article className="post" key={`post--${id}`}>
            <section>
                <img className="post__photo" src={imgURL} />
            </section>
            <section className="post__details">
                <article>
                    <div className="post__bandName" value={bandId}>{bandName}</div>
                    <div className="post__venueName">at {venueName}</div>
                    <div className="post_showDate">on {showDate}</div>
                    <div className="post__author" id={userId}>by {firstName} {lastName}</div>
                </article>
                <article className="post__uploadDate">
                    <div className="post__postDate">posted on {uploadDate}</div>
                </article>
            </section>
            <section className="post__memories">
                <div className="post__memoriesHeader">My memories:</div>
                <div className="post__memoriesBody">{memories}</div>
            </section>
            {activeProfile === userId ?
                <section className="post__manager">
                    <div className="post__managerFavorite" onClick={favoriteValue}>
                        <img className="post__managerFavorite" src={favoriteIcon} alt="Favorite" />
                    </div>
                    {/* 
                    <div className="post__managerEdit">
                        <img className="post__edit" src={editPostIcon} alt="Edit YR Post" />
                    </div> 
                    */}
                    <div className="post__managerVisibility" onClick={setNSFW}>
                        <img className="post__visibility" src={nsfwValueIcon} alt="NSFW" />
                    </div>
                    <div className="post__managerDelete" value={id} onClick={deletePost}>
                        <img
                            className="post__delete"
                            value={id}
                            src={deletePostIcon}
                            alt="Delete YR Post"
                        />
                    </div>
                </section> : <section className="post__manager">
                    <div className="post__managerFavorite" onClick={favoriteValue}>
                        <img className="post__managerFavorite" value={id} src={favoriteIcon} />
                    </div>
                </section>}
        </article>
    )
}