import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export function BlogDetail() {
    const { id } = useParams()
    const [blog, setBlog] = useState(null);
    const [err, setErr] = useState(null)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await (await fetch(`http://localhost:8080/api/blogs/${id}`)).json()
                setBlog(response.data)
            } catch (error) {
                setErr(error)
            }
        }

        fetchData()
    }, [id])


    if (err) return <p>Error loading blog</p>
    if (!blog) return <p>Loading...</p>


    return (
        <div className="text-gray-300">
            <div>
                <h1 className="text-5xl sm:text-6xl font-bold py-10">{blog.title}</h1>
                <p className="text-base sm:text-lg">{blog.description}</p>
            </div>
            {blog.subheadingList.map((sub) => (
                <div className="my-7">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-100">{sub.subTitle}</h2>
                    <p className="text-base mt-3 sm:text-lg">{sub.subDescription}</p>
                </div>
            ))}
        </div >

    )
}