import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css";
import SgLogoSmall from "../img/Horizontal_Logo.png";
import ProfileIcon from "../img/Profile_Icon.png";
import NewPostIcon from "../img/NewPost_Icon.png";

export const ClientNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="logo__small" to={"/"}><img className="logo__small" src={SgLogoSmall} /></Link>
            </li>
            <div className="navbar__group-right">
                <li className="navbar__item active">
                    <Link className="logo__small" to={"/newposts"}><img className="newPost__icon" src={NewPostIcon} /></Link>
                </li>

                {
                    <li className="navbar__item profile__icon">
                        <Link className="profile__icon" to="" onClick={() => {
                            localStorage.removeItem("sg_user")
                            navigate("/", { replace: true })
                        }}><img className="profile__icon" src={ProfileIcon} /></Link>
                    </li>
                }

            </div>
        </ul>
    )
}