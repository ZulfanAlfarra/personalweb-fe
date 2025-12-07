import { useState } from "react"


function Button() {
    const [countButton, setCountButton] = useState({ like: 0, dislike: 0 })

    return (
        <div>
            <button className="p-3 m-6 bg-green-400 rounded-xl" onClick={() => setCountButton(prev => ({ ...prev, like: prev.like + 1 }))}>Like 👍 {countButton.like}</button>
            <button className="p-3 m-6 bg-red-400 rounded-xl" onClick={() => setCountButton(prev => ({ ...prev, dislike: prev.dislike + 1 }))}>Dislike 👎 {countButton.dislike}</button>
        </div>
    )
}

export default Button