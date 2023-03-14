import { Outlet, Route, Routes } from "react-router-dom"
import { Feed } from "../feed/Feed.js"
import { NewPosts } from "../newposts/NewPosts.js"

export const ClientViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <div className="tagline">We remember it for you!</div>

                    <Outlet />
                </>
            }>
                <Route path="/" element={<Feed />} />
                <Route path="/newposts" element={<NewPosts /> } />
            </Route>
        </Routes>
    )
}