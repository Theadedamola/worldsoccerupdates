import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ollams from '../../assets/ollams.jpg'
import tofunmi from '../../assets/tofunmi.jpg'
import josh from '../../assets/Screenshot 2024-11-25 at 23.13.47.png'


const images = [
  tofunmi,
  josh,
  ollams,
]

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }
  }

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleTransitionEnd = () => {
    setIsTransitioning(false)
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-xl">
      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
        disabled={isTransitioning}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
        disabled={isTransitioning}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Carousel Container */}
      <div className="relative h-96 rounded-xl">
        {images.map((src, index) => {
          const position =
            (index - currentIndex + images.length) % images.length
          return (
            <div
              key={index}
              className="absolute w-full h-full transition-all duration-500 ease-in-out"
              style={{
                transform: `translateX(${position * 100}%)`,
                opacity: position === 0 ? 1 : 0.5,
                zIndex: position === 0 ? 1 : 0,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              <img
                src={src}
                alt={`Carousel image ${index + 1}`}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          )
        })}
      </div>

      {/* Dots Navigation */}
      <div className="absolute z-40 bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-white w-4' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
