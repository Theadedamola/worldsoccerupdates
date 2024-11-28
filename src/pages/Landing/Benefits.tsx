
import ImageMarquee from './Marquee'

const Benefits = () => {
  return (
    <div className="h-screen mx-h-[900px] flex items-center justify-center">
      <div className="flex flex-col mx-auto space-y-10 px-6 md:px-10 lg:px-16 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex flex-col gap-4 items-start">
            <h1 className="text-start text-4xl md:text-5xl font-medium">
              Diverse group of people in one place
            </h1>
            <p className="text-start text-gray-600">
              We have different group of people from different tribe and
              nationality. Our diversity reinforces our strength
            </p>
          </div>
          <ImageMarquee />
        </div>
      </div>
    </div>
  )
}
export default Benefits