import { Link } from "react-router-dom";
const SignUp = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-500 via-blue-600 to-purple-700 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold text-gray-800 mb-2">Sign Up</h2>
          <p className="text-gray-500 text-sm font-medium">Join us today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstname"
                className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider"
              >
                First Name
              </label>
              <input
                id="firstname"
                type="text"
                name="firstname"
                placeholder="John"
                required
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 hover:bg-white"
              />
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider"
              >
                Last Name
              </label>
              <input
                id="lastname"
                type="text"
                name="lastname"
                placeholder="Doe"
                required
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 hover:bg-white"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider"
            >
              Email Address
            </label>
            <input
              id="username"
              type="email"
              name="username"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 hover:bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 hover:bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="confirmpassword"
              className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider"
            >
              Confirm Password
            </label>
            <input
              id="confirmpassword"
              type="password"
              name="confirmpassword"
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 hover:bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-xl hover:shadow-xl hover:scale-105 transition duration-200 mt-10 active:scale-95"
          >
            Create Account
          </button>

          <p className="text-center text-gray-600 text-sm font-medium">
            Already have an account?
            <Link
              to="/"
              className="text-blue-600 font-bold hover:text-blue-700 transition"
            >
              Log in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
