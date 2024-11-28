import React from 'react'
import { Link } from 'react-router-dom'

const Join: React.FC = () => {
  return (
    <div className="h-fit flex items-center justify-center">
      <div className="flex flex-col mx-auto space-y-10 px-6 md:px-10 lg:px-16 py-40 ">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-3xl md:text-5xl font-medium">
            Join our community WSU
          </h1>
          <p className="text-sm md:text-lg text-gray-600 mb-8 max-w-4xl mx-auto ">
            Join our community to connect with fellow sport enthusiasts, engage
            in meaningful discussions, and gain valuable insights from
            like-minded individuals. Together, we create a supportive
            environment that promotes growth and mutual respect.
          </p>
          <Link
            to="https://chat.whatsapp.com/EVUhMjBx8mY0jIyx6KAK4H"
            className="w-fit px-8 py-3 bg-green-600 text-white rounded-full text-lg font-medium hover:bg-green-500 transition-all transform hover:scale-105"
          >
            Join Community
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Join
