import { EmployeeNav } from "./EmployeeNav.js"
import { ClientNav } from "./ClientNav.js"
import "./NavBar.css"

export const NavBar = () => {
    let localSguser = localStorage.getItem("sg_user")
    const sgUserObject = JSON.parse(localSguser)

    if (sgUserObject.staff) {
        return <EmployeeNav />
    } else {
        // return customer view
        return <ClientNav />
    }
}
