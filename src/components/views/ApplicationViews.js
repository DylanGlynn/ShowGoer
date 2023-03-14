import { EmployeeViews } from "./EmployeeViews.js"
import { ClientViews } from "./ClientViews.js"

export const ApplicationViews = () => {
    let localSgUser = localStorage.getItem("sg_user")
    const sgUserObject = JSON.parse(localSgUser)

	if (sgUserObject.staff) {
		return <EmployeeViews />
    } else {
        // return customer view
        return <ClientViews />
    }
}

