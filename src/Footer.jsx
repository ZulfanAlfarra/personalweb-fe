import { Link } from "react-router-dom"

function Footer() {
    return (
        <div className="flex flex-col gap-5 mt-18 pb-4 text-gray-400">
            <div className="flex flex-col gap-5 sm:flex-row justify-between">
                <ul className="flex flex-col gap-5 sm:flex-row">
                    <li className="transition  hover:text-zinc-100 hover:underline"><a href="">GitHub</a></li>
                    <li className="transition  hover:text-zinc-100 hover:underline"><a href="">Linkedln</a></li>
                    <li className="transition  hover:text-zinc-100 hover:underline"><a href="">Instagram</a></li>
                </ul>

                <ul className="flex flex-col gap-5 sm:flex-row">
                    <li className="transition  hover:text-zinc-100 hover:underline"><Link to="/wallet">Portofolio</Link></li>
                    <li className="transition  hover:text-zinc-100 hover:underline"><a href="">Wiki</a></li>
                </ul>
            </div>

            <div className="flex flex-col gap-1 sm:flex-row justify-between">
                <p className=" hover:text-zinc-100 hover:underline"><Link to="/">Zulfan Syahidan Alfarra</Link></p>
                <p className="">@2025 All rights reserved</p>
            </div>
        </div>
    )
}

export default Footer