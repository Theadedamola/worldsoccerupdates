import React from 'react'
import Carousel from './Carousel'
import { Link } from 'react-router-dom'
import { motionSettings } from '../../hooks/FramerSettings'
import { motion } from 'framer-motion'

const AboutUs: React.FC = () => {
  return (
    <div className="h-fit flex items-center justify-center">
      <motion.div {...motionSettings} className="flex flex-col mx-auto space-y-10 px-6 md:px-10 lg:px-16 py-24">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-3xl md:text-5xl font-medium">About WSU</h1>
          <p className="text-sm md:text-lg text-gray-600 mb-8 max-w-4xl mx-auto ">
            We are a vibrant community of sport enthusiasts, united by our
            passion for the game and our desire to support one another. Our
            members engage in lively discussions, sharing their insights and
            expertise to help each other improve their skills and knowledge.
            Through friendly banter and constructive feedback, we foster a
            culture of mutual respect and encouragement, where everyone can grow
            and thrive.
          </p>
          <Link
            to="https://chat.whatsapp.com/EVUhMjBx8mY0jIyx6KAK4H"
            className="w-fit px-8 py-3 bg-green-600 text-white rounded-full text-lg font-medium hover:bg-green-500 transition-all transform hover:scale-105"
          >
            Join Community
          </Link>
        </div>
        <div className="relative h-fit">
          <Carousel />
        </div>
      </motion.div>
    </div>
  )
}

export default AboutUs
