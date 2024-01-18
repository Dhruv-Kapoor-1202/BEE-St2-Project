/* eslint-disable no-unused-vars */
import { useState } from 'react';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from 'formik';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../state/index.js';
import Dropzone from 'react-dropzone';

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
})

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: ""
};

const Form = () => {
  const [pageType, setPageType] = useState("login");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = pageType === "login";
  const isRegister = pageType === "register";


  const register = async (values, onSubmitProps) => {
    // Sending Form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      body: formData,
    });

    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values),
    });

    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit} className='bg-base-200  flex flex-col justify-center items-center w-fit gap-4 lg:gap-6 rounded-3xl py-6 px-4 md:py-8 md:px-6 lg:p-8 shadow-md'>
          <div
            className='font-extrabold text-4xl lg:text-5xl'
          >
            {
              isLogin ? "Login" : "Sign Up"
            }
          </div>
          <div className='flex flex-col justify-center items-center w-full gap-2'>
            {
              isRegister && (
                <>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input input-bordered w-full max-w-xs "
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name='firstName'
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input input-bordered w-full max-w-xs "
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name='lastName'
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    className="input input-bordered w-full max-w-xs "
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name='location'
                  />
                  <input
                    type="text"
                    placeholder="Occupation"
                    className="input input-bordered w-full max-w-xs "
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                    name='occupation'
                  />
                  <div className='w-full input input-bordered flex p-2'>
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div
                          {...getRootProps()}
                          className='w-full max-w-xs text-center text-sm flex justify-between items-center border border-dashed border-base-content p-2 rounded-md'
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Add Picture Here</p>
                          ) : (
                            <div className='w-full flex justify-between items-center'>
                              <p>{values.picture.name}</p>
                              <EditOutlinedIcon />
                            </div>
                          )}
                        </div>
                      )}
                    </Dropzone>
                  </div>
                </>
              )}

            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full max-w-xs "
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name='email'
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full max-w-xs "
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name='password'
            />
          </div>

          {/* Buttons */}
          <div className='flex flex-col w-full'>
            <button
              className="btn btn-primary w-full text-base "
              type='submit'
            >
              {isLogin ? "Login" : "Register"}
            </button>

            <div className='divider m-0 my-2'></div>

            <p
              className='cursor-pointer text-sm hover:text-primary transition-all'
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
            >
              {isLogin ? "Don't Have an Account? Sign Up Here." : "Already Have and Account? Login Here."
              }
            </p>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Form