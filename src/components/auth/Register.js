import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Fetch, Method } from "../ApiManager"
import SgLargeLogo from "../img/Large_Logo.png";
import { ProfileImageUploadWidget } from "./ProfileImageWidget"
import "./Login.css"

export const Register = (props) => {
    const [profileImageURL, setImageURL] = useState(``)
    const [user, setUser] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        location: "",
        profileImageURL: "",
        isStaff: false
    })

    const emailURL = `?email=${user.email}`
    let navigate = useNavigate()

    const registerNewUser = () => {
        return Fetch("users", "", Method("POST", user))
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("sg_user", JSON.stringify({
                        id: createdUser.id,
                        firstName: createdUser.firstName,
                        lastName: createdUser.lastName,
                        email: createdUser.email,
                        location: createdUser.location,
                        staff: createdUser.isStaff,
                        profileImageURL: createdUser.profileImageURL
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (evt) => {
        evt.preventDefault()
        return Fetch("users", emailURL,)
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Yo! An account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = { ...user }
        copy.profileImageURL = profileImageURL
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    const cancelRegister = () => {
        navigate("/")
    }

    return (
        <main className="register__form">
            <img className="logo__large" src={SgLargeLogo} alt="ShowGoer-Logo-Large" />
            <form className="form--login" onSubmit={handleRegister}>
                <h2 className="register__header">Register for ShowGoer:</h2>
                {ProfileImageUploadWidget(setImageURL, updateUser)}
                <fieldset>
                    <label htmlFor="firstName"></label>
                    <input onChange={updateUser}
                        type="text" id="firstName" className="form-control"
                        placeholder="Enter your first name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"></label>
                    <input onChange={updateUser}
                        type="text" id="lastName" className="form-control"
                        placeholder="Enter your last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"></label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Enter your email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="location"></label>
                    <input onChange={updateUser}
                        type="text" id="location" className="form-control"
                        placeholder="You live WHERE?!" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="password"></label>
                    <input onChange={updateUser}
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Create a password already."
                        required />
                </fieldset>
                <fieldset>
                    <input className="register__check" onChange={(evt) => {
                        const copy = { ...user }
                        copy.isStaff = evt.target.checked
                        setUser(copy)
                    }}
                        type="checkbox" id="isStaff" />
                    <label className="register__isStaff" htmlFor="isStaff">Wait... Are we co-workers?!</label>
                </fieldset>
                <fieldset className="register__buttons">
                    <button className="button__submit" type="submit">Sign me up, now!</button>
                    <button className="button__cancel" type="cancel" onClick={cancelRegister}>Cancel</button>
                </fieldset>
            </form>
        </main>
    )
}

