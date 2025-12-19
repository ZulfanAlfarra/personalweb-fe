import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Blogs() {
    const [blogs, setBlogs] = useState([])
    const [err, setErr] = useState(null)
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [searchTrigger, setSearchTrigger] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isSearching) {
                    const response = await (await fetch(`http://localhost:8080/api/blogs/_search?searchText=${searchText}`)).json()
                    setBlogs(response.data)
                } else {
                    const response = await (await fetch(`http://localhost:8080/api/blogs/summary?page=${pageNumber}`)).json()
                    setBlogs(response.data)
                    setTotalPages(response.metadata.totalPages)
                }
            } catch (error) {
                setErr(error)
            }
        }

        fetchData()
    }, [pageNumber, isSearching, searchTrigger])

    const handleSearch = () => {
        if (searchText.trim() === "") {
            setIsSearching(false)
            setPageNumber(0)
        } else {
            setIsSearching(true)
            setPageNumber(0)
            setSearchTrigger(prev => prev + 1)
        }
    }

    return (
        <div className="text-gray-300">
            <div className="py-8 ">
                <h1 className="text-4xl sm:text-5xl font-bold pb-8"><Link to="/" className="hover:underline decoration-2">Zulfan</Link> Blog</h1>
                <p className="text-base sm:text-lg">Hi 🙌, thank you for coming, this blog is about my personal thoughts and experience</p>
            </div>

            <div class="relative">
                <input type="search" id="default-search" class="block w-full p-4 ps-8 text-sm text-gray-200 border border-gray-400 rounded-lg bg-gray-700" placeholder="Search blog..." required value={searchText} onChange={(e) => setSearchText(e.target.value)} onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch()
                    }
                }} />
                <button type="submit" class="text-white absolute end-2.5 bottom-2.5  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-fuchsia-700 hover:bg-fuchsia-800 focus:ring-fuchsia-900" onClick={handleSearch}>Search</button>
            </div>

            <div className="grid gap-3 py-4 sm:grid-cols-1">
                {blogs.map((blog, index) => (
                    <Link to={`${blog.id}`} className="p-3 rounded-md border border-gray-400 gap-3 grid hover:bg-slate-900 transition delay-75 ease-in-out">
                        <h2 className="text-lg font-bold sm:text-xl hover:underline decoration-2" >{blog.title}</h2>
                        <p className="text-base text-gray-500">{new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(blog.createdAt))}</p>
                        <p>{blog.description.length > 150 ? blog.description.slice(0, 150) + "..." : blog.description}</p>
                        <p className="text-fuchsia-300 hover:underline">Read more</p>
                    </Link>
                ))}
            </div>

            <div className={isSearching ? "hidden" : "block"} >
                <button
                    disabled={pageNumber === 0}
                    onClick={() => setPageNumber(prev => prev - 1)}
                    className={`px-4 py-2 rounded ${pageNumber === 0 ? "bg-gray-700 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-700"}`}
                >
                    &lt;&lt;
                </button>

                <span className="px-3 py-2 text-lg">
                    Page {pageNumber + 1} / {totalPages}
                </span>

                <button
                    disabled={pageNumber + 1 >= totalPages}
                    onClick={() => setPageNumber(prev => prev + 1)}
                    className={`px-4 py-2 rounded ${pageNumber + 1 >= totalPages
                        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "bg-gray-600 hover:bg-gray-700"
                        }`}
                >
                    &gt;&gt;
                </button>
            </div>
        </div>
    )
}

export default Blogs