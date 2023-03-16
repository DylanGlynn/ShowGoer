import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css";
import SgLogoSmall from "../img/Horizontal_Logo.png";
import ProfileIcon from "../img/Profile_Icon.png";
import NewPostIcon from "../img/NewPost_Icon.png";

export const ClientNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <div className="navbar__group-left">
            <li className="navbar__item active">
                <Link className="logo__small" to={"/"}><img className="logo__small" src={SgLogoSmall} /></Link>
            </li>
            <div className="navbar__tagline">We remember it for you!</div>
            </div>
            <div className="navbar__group-right">
                <li className="navbar__item active">
                    <Link className="logo__small" to={"/newposts"}><img className="newPost__icon" src={NewPostIcon} /></Link>
                </li>

                {
                    <li className="navbar__item profile__icon">
                        <Link className="profile__icon" to={"/profile"}><img className="profile__icon" src={ProfileIcon} /></Link>
                    </li>
                }
            </div>
        </ul>
    )
}