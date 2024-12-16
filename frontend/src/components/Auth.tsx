import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupType } from "common-utils-aryan";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<
    SignupType & { confirmPassword?: string }
  >({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  async function sendRequest() {
    if (
      type === "signup" &&
      postInputs.password !== postInputs.confirmPassword
    ) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data.jwt;
      console.log("authtoken:", jwt);
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      alert("Error while signing up");
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col bg-gray-100">
      <div className="flex justify-center">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <div className="px-4">
            <div className="text-3xl font-extrabold text-gray-800">
              {type === "signup"
                ? "Create an account"
                : "Sign in to your account"}
            </div>
            <div className="text-slate-500 mt-2">
              {type === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link
                className="pl-2 underline text-blue-600 hover:text-blue-800"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>
          <div className="pt-8">
            {type === "signup" && (
              <LabelledInput
                label="Name"
                placeholder="User Name"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            )}
            <LabelledInput
              label="Email"
              placeholder="User Email"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              type={passwordVisible ? "text" : "password"}
              placeholder="Set Password"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
              toggleVisibility={() => setPasswordVisible(!passwordVisible)}
              isPasswordField={true}
              isVisible={passwordVisible}
            />
            {type === "signup" && (
              <LabelledInput
                label="Confirm Password"
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    confirmPassword: e.target.value,
                  });
                  setErrorMessage(""); // Reset error on input change
                }}
                toggleVisibility={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
                isPasswordField={true}
                isVisible={confirmPasswordVisible}
              />
            )}
            {errorMessage && (
              <div className="text-red-600 text-sm pt-2">{errorMessage}</div>
            )}
            <button
              onClick={sendRequest}
              type="button"
              className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  toggleVisibility?: () => void;
  isPasswordField?: boolean;
  isVisible?: boolean;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
  toggleVisibility,
  isPasswordField = false,
  isVisible = false,
}: LabelledInputType) {
  return (
    <div className="relative pt-4">
      <label className="block mb-2 text-sm text-gray-800 font-semibold">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
      {isPasswordField && (
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute top-12 right-3 text-gray-500 hover:text-gray-700"
        >
          <i className={`fas fa-${isVisible ? "eye-slash" : "eye"}`} />
        </button>
      )}
    </div>
  );
}
