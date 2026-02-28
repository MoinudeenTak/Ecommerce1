import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiFillHome } from "react-icons/ai";
import { MdEmail, MdLock } from "react-icons/md";

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    // console.log("Form Data", formData);
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (!validUser) {
      alert("Invalid credentials!");
      return;
    }

    // Store login session
    localStorage.setItem("loggedInUser", JSON.stringify(validUser));

    alert("Login successful!");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-500 via-blue-600 to-purple-700 p-4 relative">
      {/* Home Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-white hover:bg-white hover:text-blue-600 p-3 rounded-full transition duration-200"
        title="Go Home"
      >
        <AiFillHome size={24} />
      </Link>

      {/* Login Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition duration-300 hover:shadow-3xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-sm">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative flex items-center">
              <MdEmail className="absolute left-4 text-gray-400" size={20} />
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email Address is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <MdLock className="absolute left-4 text-gray-400" size={20} />
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must be 8+ chars with uppercase, lowercase, number & special char",
                  },
                })}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login Button */}

          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:scale-105 transition duration-200 active:scale-95"
          >
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?
          <Link
            to="/SignUp"
            className="text-blue-600 font-semibold hover:underline ml-1"
          >
            Create Your Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
