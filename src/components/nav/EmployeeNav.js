import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css";
import SgLogoSmall from "../img/Horizontal_Logo.png";
import NewPostIcon from "../img/NewPost_Icon.png";
import LargeProfileIcon from "../img/Profile_LargeIcon.png"

export const EmployeeNav = () => {
    const navigate = useNavigate()

    let localSguser = localStorage.getItem("sg_user")
    const sgUserObject = JSON.parse(localSguser)

    let ProfileIconImage = LargeProfileIcon
    sgUserObject.profileImageURL ? ProfileIconImage = sgUserObject.profileImageURL : ProfileIconImage = LargeProfileIcon

    return (
        <ul className="navbar">
            <div className="navbar__group-left">
                <li className="navbar__item active">
                    <Link className="logo__small" to={"/"}><img className="logo__small" src={SgLogoSmall} /></Link>
                </li>
                <div className="navbar__tagline">You are on the clock! Back to work!</div>
            </div>
            <div className="navbar__group-right">
                <li className="navbar__item active">
                    <Link className="logo__small" to={"/newposts"}><img className="newPost__icon" src={NewPostIcon} /></Link>
                </li>
                <li className="navbar__item">
                    <Link className="profile__icon" to={"/profile"}><img className="navbar__profileIcon" src={ProfileIconImage} /></Link>
                </li>
            </div>
        </ul>
    )
}