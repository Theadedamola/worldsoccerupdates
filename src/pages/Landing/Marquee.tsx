import { useEffect, useState } from 'react'
import ollams from '../../assets/ollams.jpg'
import tofunmi from '../../assets/tofunmi.jpg'
import josh from '../../assets/Screenshot 2024-11-25 at 23.13.47.png'

const images = [tofunmi, josh, ollams]

const MarqueeColumn = ({ direction = 'up', speed = 150 }) => {
  const [position, setPosition] = useState(() => {
    // Start from negative position for downward movement
    return direction === 'down' ? -(images.length * 240) : 0
  })
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setPosition((prev) => {
          const newPosition = direction === 'up' ? prev - 1 : prev + 1
          const contentHeight = images.length * 240 // Approximate height of each image container

          // Reset position when reaching threshold
          if (direction === 'up' && Math.abs(newPosition) >= contentHeight) {
            return 0
          } else if (direction === 'down' && newPosition >= 0) {
            return -contentHeight
          }

          return newPosition
        })
      }, speed)

      return () => clearInterval(interval)
    }
  }, [direction, speed, isPaused])

  const getTransform = () => {
    return `translateY(${position}px)`
  }

  // Create enough copies to ensure smooth scrolling
  const duplicatedImages = [
    ...images,
    ...images,
    ...images,
    ...images,
    ...images,
  ]

  return (
    <div
      className="h-full overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="transition-transform duration-300 ease-linear"
        style={{ transform: getTransform() }}
      >
        {duplicatedImages.map((image, index) => (
          <div key={index} className="p-2">
            <img
              src={image}
              alt={`Marquee image ${index}`}
              className="w-56 lg:h-56 rounded-lg object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const ImageMarquee = () => {
  return (
    <div className="mt-14 w-full h-[600px] grid grid-cols-3 gap-2">
      <div className="overflow-hidden">
        <MarqueeColumn direction="up" speed={150} />
      </div>
      <div className="overflow-hidden">
        <MarqueeColumn direction="down" speed={150} />
      </div>
      <div className="overflow-hidden">
        <MarqueeColumn direction="up" speed={150} />
      </div>
    </div>
  )
}

export default ImageMarquee
