import { Link } from "react-router-dom"
import hidePostIcon from "../img/HidePost_Icon.png"
import editPostIcon from "../img/EditPost_Icon.png"
import deletePostIcon from "../img/DeletePost_Icon.png"
import favoritePostIcon from "../img/Favorite_Icon.png"
import { Fetch, Method } from "../ApiManager"

export const Post = ({ id, userId, bandName, firstName, lastName, imgURL, venueName, showDate, uploadDate, memories, activeProfile, getPosts }) => {
    const deletePost = () => {
        Fetch("posts/", id, Method("DELETE",))
            .then(() => getPosts())
    }

    return (
        <article className="post" key={`post--${id}`}>
            <section>
                <img className="post__photo" src={imgURL} />
            </section>
            <section className="post__details">
                <article>
                    <div className="post__bandName">{bandName}</div>
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
                    {/* <div className="post__managerEdit">
                        <img className="post__edit" src={editPostIcon} alt="Edit YR Post" />
                    </div>
                    <div className="post__managerVisibility">
                        <img className="post__visibility" src={hidePostIcon} alt="NSFW" />
                    </div> */}
                    <div className="post__managerDelete" value={id} onClick={deletePost}>
                        <img
                            className="post__delete"
                            value={id}
                            src={deletePostIcon}
                            alt="Delete YR Post"
                             />
                    </div>
                </section> : <section className="post__manager">
                    <div className="post__managerFavorite">
                        {/* <img className="post__managerFavorite" value={id} src={favoritePostIcon} /> */}
                    </div>
                </section>}
        </article>
    )
}