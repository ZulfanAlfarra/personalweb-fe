import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const BlogLayout = () => {
    return (
        <>
            <div className='pt-8 flex justify-between'>
                <Link to="/blogs" className='text-fuchsia-300 font-extrabold '>
                    <span className='font-semibold hover:underline'>BLOG</span> &gt;
                </Link>
                <Link to="/blogs/create" className='hover:bg-fuchsia-300 hover:border-0 px-4 py-1 rounded-md border transition delay-75 ease-in-out'>Write ➕</Link>
            </div>

            <Outlet />
        </>

    )
}

export default BlogLayout