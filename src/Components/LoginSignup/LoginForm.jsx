import { Link } from "react-router-dom";
const LoginForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-500 via-blue-600 to-purple-700">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition duration-300 hover:shadow-3xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Login</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Enter your Email Address
            </label>
            <input
              id="username"
              type="email"
              name="username"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your Password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:scale-105 transition duration-200 mt-8 active:scale-95"
          >
            Login
          </button>

          <p className="text-center text-gray-600 text-sm">
            Don't have an account?
            <Link
              to="/SignUp"
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Create New Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
