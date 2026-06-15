import { BrowserRouter, Router, Route, Routes, Link } from "react-router-dom"
import { useUnsplash } from "./hooks/useUnsplash"
import { useLocalStorage } from "./hooks/useLocalStorage";
import PhotoGrid from "./components/photoGrid.jsx"
import MyGallery from "./components/myGallery.jsx";


function App() {
  const [gallery, setGallery] = useLocalStorage("gallery", [])
  const { fetchRandomPhotos, photos, isLoading, error } = useUnsplash()

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

        <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-10">
          <Link to={"/"} className="text-2xl font-bold text-gray-800">Unsplash Gallery</Link>

          <div className="space-x-6">
            <Link to={"/gallery"} className="hover:text-blue-600">Gallery ({gallery.length}) </Link>

            <button onClick={() => fetchRandomPhotos()} className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer">Randomize</button>
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
