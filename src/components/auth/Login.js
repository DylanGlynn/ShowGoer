import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { Fetch } from "../ApiManager";
import "./Login.css"
import SgLargeLogo from "../img/Large_Logo.png";

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const emailURL = `?email=${email}`

    const handleLogin = (e) => {
        e.preventDefault()

        return Fetch("users", emailURL,)
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("sg_user", JSON.stringify({
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        location: user.location,
                        staff: user.isStaff,
                        profileImageURL: user.profileImageURL
                    }))
                    navigate("/")
                }
                else {
                    window.alert("Invalid login, Callahan!")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <img className="logo__large" src={SgLargeLogo} alt="ShowGoer-Logo-Large"/>
                <form className="form--login" onSubmit={handleLogin}>
                    <h2 className="login__prompt">Please, sign in.</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"></label>
                        <input type="email"
                            value={email}
                            onChange={evt => setEmail(evt.target.value)}
                            className="form-control"
                            placeholder="Enter your email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"></label>
                        <input type="password"
                        value={password}
                        onChange={evt => setPassword(evt.target.value)}
                        className="form-control"
                        placeholder="Enter your password"
                        required />
                    </fieldset>
                    <fieldset>
                        <button className="button__signin" type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="register">
                <Link className="register__link" to="/register">Register now! Supplies are limited!</Link>
            </section>
        </main>
    )
}

