import Marquee from 'react-fast-marquee'
import ollams from '../../assets/ollams.jpg'
import tofunmi from '../../assets/tofunmi.jpg'
import josh from '../../assets/Screenshot 2024-11-25 at 23.13.47.png'

import baller2 from '../../assets/footballPic.jpg'
import baller3 from '../../assets/footballPic2.jpg'
import tennis from '../../assets/tennis1.jpg'
import pelumi from '../../assets/oluwapelumi.jpg'
import babaella from '../../assets/babaella.jpg'
import { motion } from 'framer-motion'
import { motionSettings } from '../../hooks/FramerSettings'

const images = [
  baller2,
  baller3,
  tennis,
  tofunmi,
  josh,
  ollams,
  pelumi,
  babaella,
]

const BenefitFour = () => {
  return (
    <div className="h-fit flex items-center justify-center">
      <motion.div {...motionSettings} className="flex flex-col mx-auto space-y-10 px-6 md:px-10 lg:px-16 py-24">
        <div className="flex flex-col gap-10 items-start justify-between">
          <div className="flex flex-col gap-4 items-start">
            <h1 className="text-start text-4xl md:text-5xl font-medium">
              Annual Meetups
            </h1>
            <p className="text-start text-gray-600 max-w-4xl">
              We meet yearly to hangout, bond, talk and show love to one
              another. Also we recognize those who have made a big contribution
              to the community over the course of the year.
            </p>
          </div>
          <div>
            <Marquee gradient={false} pauseOnHover speed={50}>
              <div className="flex justify-center gap-4 ml-4">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-[300px] rounded-2xl"
                  />
                ))}
              </div>
            </Marquee>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
export default BenefitFour
