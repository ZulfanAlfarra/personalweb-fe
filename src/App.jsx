import Home from "./Home"
import Footer from "./Footer"
import Blogs from "./Blogs"
import Button from "./Button"

import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import CreateBlog from "./CreateBlog";
import { BlogDetail } from "./BlogDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-slate-800 min-h-screen">
        <div className="max-w-5xl mx-auto antialiased">
          <div className="p-6 sm:p-0 max-w-3xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<BlogDetail />} />
              <Route path="/blogs/create" element={<CreateBlog />} />
            </Routes>
            {/* <Blog /> */}
            {/* <Button /> */}

            <Footer />
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App