import { useState, useEffect } from "react"

export const Profiles = () => {
    const localSgUser = localStorage.getItem("sg_user")
    const sgUserObject = JSON.parse(localSgUser)

    const [users, setUsers] = useState([])

}