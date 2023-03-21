import { Outlet, Route, Routes } from "react-router-dom"
import { Feed } from "../feed/Feed.js"
import { NewPosts } from "../newposts/NewPosts.js"
import { Profile } from "../profiles/Profiles.js"
import { UserPage } from "../profiles/UserPage.js"

export const ClientViews = () => {
    return (
        <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/newposts" element={<NewPosts />} />
            <Route path="users/:userId" element={<UserPage />} />
            <Route path="/profile" element={<Profile />} />

        </Routes>
    )
}