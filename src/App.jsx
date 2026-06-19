import { BrowserRouter, Router, Route, Routes, Link } from "react-router-dom"
import { useUnsplash } from "./hooks/useUnsplash"
import { useLocalStorage } from "./hooks/useLocalStorage";
import PhotoGrid from "./components/photoGrid.jsx"
import MyGallery from "./components/myGallery.jsx";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import SearchBar from "./components/searchBar.jsx";


function App() {
  const [isOpen, setIsOpen] = useState(false);

  const [gallery, setGallery] = useLocalStorage("gallery", [])
  const { fetchRandomPhotos, searchPhotos, photos, isLoading, error } = useUnsplash()

  const addToGallery = (photo) => {
    if (!gallery.some((save) => save.id === photo.id)) {
      setGallery([...gallery, photo])
    }
  }

  const removeFromGallery = (id) => {
    setGallery(gallery.filter(photo => photo.id !== id))
  }

  const isInGallery = (id) => gallery.some(saved => saved.id === id);


  return (
    <BrowserRouter>

      <div className="min-h-screen bg-gray-50">

        <nav className="bg-white shadow-md p-[20px] md:px-[60px] flex justify-between items-center sticky top-0 z-10">

          <Link to={"/"} className="text-[20px] md:text-[24px] xl:text-[28px] font-bold text-gray-800">Unsplash Gallery</Link>

          <div>
            <button className="lg:hidden xl:hidden text-[28px]" onClick={() => setIsOpen(true)}
            >
             <GiHamburgerMenu />
            </button>

            {isOpen && (
              <div className="fixed inset-0 bg-white z-50 flex md:flex lg:hidden flex-col overflow-hidden">

                <div className="flex justify-between items-center p-[20px] border-b">
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="text-[20px] font-bold"
                  >
                    Unsplash Gallery
                  </Link>

                  <button onClick={() => setIsOpen(false)} className="text-[28px]">
                    <IoClose />
                  </button>
                </div>

                {/* Mobile */}
                <div className="flex flex-col items-start justify-start gap-[24px] pt-[20px] px-[20px]">

                  <SearchBar onSearch={(query) => {
                    searchPhotos(query);
                    setIsOpen(false);
                  }} 
                  />

                  <Link
                    to="/gallery"
                    onClick={() => setIsOpen(false)}
                    className="text-[24px] font-medium hover:text-blue-600"
                  >
                    Gallery ({gallery.length})
                  </Link>

                  <button
                    onClick={() => {
                      fetchRandomPhotos();
                      setIsOpen(false);
                    }}
                    className="py-[7px] w-full bg-blue-600 text-white rounded-[10px] text-[22px] hover:bg-blue-700 transition"
                  >
                    Randomize
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Desktop */}
          <div className="hidden lg:flex xl:flex flex-row justify-center items-center gap-[15px]">

            <SearchBar onSearch={searchPhotos} />

            <Link to={"/gallery"} className="hover:text-blue-600 md:text-[18px]">Gallery ({gallery.length}) </Link>

            <button onClick={() => fetchRandomPhotos()} className="md:px-[20px] md:py-[7px] bg-blue-600 text-white md:text-[18px] rounded-[8px] hover:bg-blue-700 transition cursor-pointer">Randomize</button>
          </div>
        </nav>


        <main>
          <Routes>
            <Route path="/" element={
              <PhotoGrid
                photos={photos}
                isLoading={isLoading}
                error={error}
                addToGallery={addToGallery}
                removeFromGallery={removeFromGallery}
                isInGallery={isInGallery}
              />
            } />

            <Route path="/gallery" element={<MyGallery gallery={gallery} removeFromGallery={removeFromGallery} />} />

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
