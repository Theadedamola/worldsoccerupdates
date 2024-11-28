import { motion } from 'framer-motion'
import footballer from '../../assets/football-player.png'
import { motionSettings } from '../../hooks/FramerSettings'
const BenefitTwo = () => {
  return (
    <div className="h-fit mx-h-[900px] flex items-center justify-center">
      <motion.div {...motionSettings} className="flex flex-col mx-auto space-y-10 px-6 md:px-10 lg:px-16 py-24">
        <div className="p-6 bg-green-100 rounded-2xl flex flex-col lg:flex-row items-center justify-between">
          <div className="flex flex-col gap-4 items-start">
            <h1 className="text-start text-4xl md:text-5xl font-medium text-green-600">
              Discussion, Analysis and Banter
            </h1>
            <p className="text-start">
              Constantly talking about all things sports, football, basketball,
              boxing, formula 1 etc. With light banter and knowledgeable
              insights.
            </p>
          </div>
          <img src={footballer} alt="" className='w-[606px]'/>
        </div>
      </motion.div>
    </div>
  )
}
export default BenefitTwo
