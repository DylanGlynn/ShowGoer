import { Outlet, Route, Routes } from "react-router-dom"
import { Feed } from "../feed/Feed.js"
import { NewPosts } from "../newposts/NewPosts.js"
import { Profile } from "../profiles/Profiles.js"
import { UserPage } from "../profiles/UserPage.js"
import { BandPage } from "../profiles/BandPage.js"

export const EmployeeViews = () => {
	return (
		<Routes>
			<Route path="/" element={<Feed />} />
			<Route path="/newposts" element={<NewPosts />} />
			<Route path="/users/:userId" element={<UserPage />} />
			<Route path="/profile" element={<Profile />} />
			<Route path="/bands/:bandId" element={<BandPage />} />
		</Routes >
	)
}