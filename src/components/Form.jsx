import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
  });

  const onChange = (e) => {
    let { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let validationErrors = validate(data);
    setErrors(validationErrors);

    let errorKeys = Object.keys(validationErrors);

    if (errorKeys.length === 0) {
      toast("Registration Successful");
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  };

  const validate = (formData) => {
    let error = {};

    if (!formData.firstName.trim()) {
      error.firstName = "Please enter your first name";
    }
    if (!formData.lastName.trim()) {
      error.lastName = "Please enter your last name";
    }
    if (!formData.email.trim()) {
      error.email = "Please enter your email";
    } else if (!isValidEmail(formData.email)) {
      error.email = "Please enter a valid email address";
    }

    if (!formData.mobile.trim()) {
      error.mobile = "Please enter your mobile number";
    } else if (formData.mobile.trim().length !== 10 || !isValidMobile(formData.mobile)) {
      error.mobile = "Please enter a valid 10-digit mobile number";
    }

    return error;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isValidMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="form-container p-6 bg-gray-100">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          limit={1}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="dark"
        />
        <fieldset className="border p-4 rounded">
          <legend className="text-xl font-semibold">Fill this form</legend>
          <form onSubmit={onSubmit}>
            {["firstName", "lastName", "email", "mobile"].map((fieldName) => (
              <div key={fieldName}>
                <label className="block mb-4">{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:</label>
                <input
                  type={fieldName === "email" ? "email" : "text"}
                  name={fieldName}
                  placeholder={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                  onChange={onChange}
                  className={`border w-full p-2 rounded ${errors[fieldName] ? "border-red-500" : ""}`}
                />
                {errors[fieldName] && <p className="text-red-500">{errors[fieldName]}</p>}
              </div>
            ))}
            <input
              type="submit"
              value="REGISTER"
              className="bg-blue-500 text-white mt-4 py-2 px-4 rounded cursor-pointer hover:bg-blue-700"
            />
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default Form;
