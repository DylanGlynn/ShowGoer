import { Link } from "react-router-dom"

export const Post = ({ id, userId, bandName, firstName, lastName, imgURL, venueName, showDate, memories }) => {
    return (
        <article className="post" key={`post--${id}`}>
            <section className="post__photo">
                <img src={imgURL} />
            </section>
            <section className="post__details">
                <div className="post__bandName">{bandName}</div>
                <div className="post__venueName">at {venueName}</div>
                <div className="post_showDate">on {showDate}</div>
                <div className="post__author" id={userId}>by {firstName} {lastName}</div>
            </section>
            <section className="post__memories">
                <div className="post__memoriesHeader">My memories:</div>
                <div className="post__memoriesBody">{memories}</div>
            </section>
            <section className="post__manager"></section>
        </article>
    )
}