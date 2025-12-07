import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Blogs() {
    const [blogs, setBlogs] = useState([])
    const [err, setErr] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await (await fetch("http://localhost:8080/api/v1/blogs/summary/blog")).json()
                setBlogs(response.data)
            } catch (error) {
                setErr(error)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="text-gray-300">
            <div className="py-8 ">
                <h1 className="text-4xl sm:text-5xl font-bold pb-4">Blog</h1>
                <p className="text-base sm:text-lg">Hi 🙌, thank you for coming, this blog is about my personal thoughts and experience</p>
            </div>

            <div className="grid gap-3 py-4 sm:grid-cols-2">
                {blogs.map((blog, index) => (
                    <div className="bg-gray-600 p-3 rounded-sm">
                        <p className="text-xs">{new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(blog.createdAt))}</p>
                        <Link className="text-lg font-bold sm:text-xl hover:underline hover: decoration-fuchsia-400" to={`${blog.id}`}>{blog.title}</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Blogs