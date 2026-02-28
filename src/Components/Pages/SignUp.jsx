import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiFillHome } from "react-icons/ai";
import { useState, useEffect } from "react";
const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // const onSubmit = (formData) => {
  //   const usersList = JSON.parse(localStorage.getItem("users")) || [];
  //   console.log(usersList);

  //   const userExists = usersList.find((user) => user.email === formData.email);

  //   if (userExists) {
  //     alert("User already exists!");
  //     return;
  //   }
  //   const newUser = {
  //     email: formData.email,
  //     password: formData.password,
  //   };
  //   const updatedUsers = [...usersList, newUser];

  //   // usersList.push(newUser);wrong method never mutate 
  //   // usersList.push(updatedUsers); wrong method
  //   localStorage.setItem("users", JSON.stringify(updatedUsers));

  //   alert("User saved successfully!");
  //   navigate("/LoginForm");
  // };

  const [users, setUsers] = useState(() => {
  return JSON.parse(localStorage.getItem("users")) || [];
});
 
useEffect(() => {
  localStorage.setItem("users", JSON.stringify(users));
}, [users]);
 
const onSubmit = (formData) => {
  const userExists = users.find(
    (user) => user.email === formData.email
  );

  if (userExists) {
    alert("User already exists!");
    return;
  }

  const newUser = {
    email: formData.email,
    password: formData.password,
  };

  setUsers((prevUsers) => [...prevUsers, newUser]);

  alert("User saved successfully!");
   navigate("/LoginForm");
};
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-500 via-blue-600 to-purple-700 p-4">
      {/* Home Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-white hover:bg-white hover:text-blue-600 p-3 rounded-full transition duration-200"
        title="Go Home"
      >
        <AiFillHome size={24} />
      </Link>
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold text-gray-800 mb-2">Sign Up</h2>
          <p className="text-gray-500 text-sm font-medium">Join us today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstname"
                className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider"
              >
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                {...register("firstname", {
                  required: "Enter your firstname",
                  pattern: {
                    value: /^[A-Za-z]{2,}$/,
                    message: "please fill the first name",
                  },
                })}
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 hover:bg-white"
              />
              {errors.firstname && <p>{errors.firstname.message}</p>}
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider"
              >
                Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                {...register("lastname", {
                  required: "Enter your lastname",
                  pattern: {
                    value: /^[A-Za-z]{2,}$/,
                    message: "please fill the last name",
                  },
                })}
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 hover:bg-white"
              />
              {errors.lastname && <p>{errors.lastname.message}</p>}
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
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email Address is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 hover:bg-white"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must contain 8 characters, uppercase, lowercase, number and special character",
                },
              })}
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 hover:bg-white"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div>
            <label
              htmlFor="confirmpassword"
              className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider"
            >
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register(" ConfirmPassword", {
                required: "Confirm Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Password must be same ",
                },
              })}
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 hover:bg-white"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-xl hover:shadow-xl hover:scale-105 transition duration-200 mt-10 active:scale-95"
          >
            Create Your Account
          </button>

          <p className="text-center text-gray-600 text-sm font-medium">
            Already have an account?
            <Link
              to="/LoginForm"
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
