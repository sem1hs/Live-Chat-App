import { useState } from "react";
import GenderCheckBox from "./GenderCheckBox";
import { Link } from "react-router-dom";
import useSignUp from "../../hooks/useSignup";

function SignUp() {
  const [inputs, setInputs] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const { loading, signup } = useSignUp();
  const handleOnChange = (data, input) => {
    // eslint-disable-next-line default-case
    switch (input) {
      case "fullName": {
        setInputs({ ...inputs, fullName: data });
        break;
      }
      case "userName": {
        setInputs({ ...inputs, userName: data });
        break;
      }
      case "password": {
        setInputs({ ...inputs, password: data });
        break;
      }
      case "confirmPassword": {
        setInputs({ ...inputs, confirmPassword: data });
        break;
      }
    }
  };
  const handleGenderClick = (e) => {
    const gender = e.target.value;
    setInputs({ ...inputs, gender });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3x1 font-semibold text-center text-gray-300">
          Sign Up
          <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              onChange={(e) => handleOnChange(e.target.value, "fullName")}
              value={inputs.fullName}
              type="text"
              placeholder="John Doe"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              onChange={(e) => handleOnChange(e.target.value, "userName")}
              value={inputs.userName}
              type="text"
              placeholder="johndoe"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              onChange={(e) => handleOnChange(e.target.value, "password")}
              value={inputs.password}
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              onChange={(e) =>
                handleOnChange(e.target.value, "confirmPassword")
              }
              value={inputs.confirmPassword}
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <GenderCheckBox
            handleGenderClick={handleGenderClick}
            inputs={inputs}
            setInputs={setInputs}
          ></GenderCheckBox>

          <Link
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            to="/login"
          >
            Already have an account ?
          </Link>
          <div>
            <button
              className="btn btn-block btn-sm mt-2 border border-t-slate-700"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
