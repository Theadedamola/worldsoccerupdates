import { motion } from "framer-motion"
import { motionSettings } from "../../hooks/FramerSettings"

const BenefitThree = () => {
  return (
    <div className="h-screen mx-h-[900px] flex items-center justify-center">
      <motion.div {...motionSettings} className="flex flex-col mx-auto space-y-10 px-6 md:px-10 lg:px-16 py-16">
        <div className="flex flex-col-reverse lg:flex-row gap-10 items-center justify-between">
          <img
            src="https://img.freepik.com/free-photo/charming-joyful-caring-young-african-american-family-man-woman-siblings-smiling-broadly-show-heart-gestures-grinning-express-love-empathy-positivity-two-loyal-friends-cherish-friendship_1258-81676.jpg?t=st=1732391106~exp=1732394706~hmac=5bfb0004a3d5d8651d38f755c330bf29fa450627c2c60a25c221c104ca9ff5dd&w=826"
            alt=""
            className="w-[600px] rounded-2xl"
          />
          <div className="flex flex-col gap-4 items-start">
            <h1 className="text-start text-4xl md:text-5xl font-medium">
              Love and Support
            </h1>
            <p className="text-start text-gray-600">
              We are always ready to show love to our members and support
              everyone the best way we can. Thats one thing we never compromise
              on, we value the wellbeing of ourselves.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
export default BenefitThree
