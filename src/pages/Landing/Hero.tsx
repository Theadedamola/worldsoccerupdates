import { Link } from 'react-router-dom'
import ollams from '../../assets/ollams.jpg'
import tofunmi from '../../assets/tofunmi.jpg'
import josh from '../../assets/Screenshot 2024-11-25 at 23.13.47.png'
import pelumi from '../../assets/oluwapelumi.jpg'

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-hero-bg bg-cover flex items-center justify-center">
      <div className="absolute w-full h-screen bg-black/40"></div>
      {/* Content */}
      <div className="relative z-30 max-w-5xl mx-auto text-center px-6 md:px-10 lg:px-16">
        <div className="flex items-center justify-center -space-x-4 mb-4">
          <img
            src={tofunmi}
            alt=""
            className="w-10 h-10 rounded-full border border-gray-200 hover:z-40 hover:-translate-y-2 transition-all duration-300"
          />
          <img
            src={ollams}
            alt=""
            className="w-10 h-10 rounded-full border border-gray-200 hover:z-40 hover:-translate-y-2 transition-all duration-300"
          />
          <img
            src={josh}
            alt=""
            className="w-10 h-10 rounded-full border border-gray-200 hover:z-40 hover:-translate-y-2 transition-all duration-300"
          />
          <img
            src={pelumi}
            alt=""
            className="w-10 h-10 rounded-full border border-gray-200 hover:z-40 hover:-translate-y-2 transition-all duration-300"
          />
          <div className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:-translate-y-2 transition-all duration-300 flex items-center justify-center">
            <p className="text-xs text-gray-400">200+</p>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl max-w-[800px] font-semibold text-white mb-6">
          Community of Sport Lovers, Banter specialists and Analysts
        </h1>
        <p className="text-lg  text-gray-200 mb-8 max-w-3xl mx-auto">
          Join our vibrant community where passion meets performance. A family
          of sport lovers, banter specialists and overall helping one another.
        </p>

        <div className="flex flex-row gap-4 items-center justify-center">
          <Link
            to="https://chat.whatsapp.com/EVUhMjBx8mY0jIyx6KAK4H"
            className="w-fit px-8 py-3 bg-green-600 text-white rounded-full text-lg font-medium hover:bg-green-500 transition-all transform hover:scale-105"
          >
            Join Community
          </Link>
        </div>

        {/* Optional: Stats or highlights */}
        <div className="mt-16 grid grid-cols-2 gap-2">
          {[
            { number: '200+', label: 'Active Members' },
            { number: 'All', label: 'Sport Categories' },
          ].map((stat) => (
            <div key={stat.label} className="text-white">
              <div className="text-2xl md:text-4xl font-bold">
                {stat.number}
              </div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
