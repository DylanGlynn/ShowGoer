import { Outlet, Route, Routes } from "react-router-dom"
import { Feed } from "../feed/Feed.js"
import { NewPosts } from "../newposts/NewPosts.js"
import { Profile } from "../profiles/Profiles.js"

export const EmployeeViews = () => {
	return (
		<Routes>
			<Route path="/" element={<Feed />} />
			<Route path="/newposts" element={<NewPosts />} />
			<Route path="/users/:userId" element={<Profile />} />
			<Route path="/profile" element={<Profile />} />
		</Routes >
	)
}