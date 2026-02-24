import { FaHome, FaSignInAlt, FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <header className="bg-linear-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">EcommercePro</h1>
          </div>
          <div className="flex gap-4">
            <Link to='/LoginForm'>
            <button className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-400 transition">
              <FaSignInAlt />
              Login
            </button>
            </Link>
            <Link to='/SignUp'><button className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-400 transition">
              <FaUserPlus />
              Sign Up
            </button></Link>
            
          </div>
        </div>
      </header>
      
      <main className="min-h-screen bg-gray-50">
        <section className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to EcommercePro</h2>
          <p className="text-xl text-gray-600 mb-8">Shop the best products at unbeatable prices</p>
        </section>
      </main>
    </>
  )
}

export default Home