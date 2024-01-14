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
        <form onSubmit={handleSubmit} className='flex flex-col p-4 bg-pink-50 rounded-[33px] shadow-lg w-fit'>
          <div className='flex flex-col gap-2'>
            {
              isRegister && (
                <>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input input-bordered w-full max-w-xs bg-inherit"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name='firstName'
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input input-bordered w-full max-w-xs bg-inherit"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name='lastName'
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    className="input input-bordered w-full max-w-xs bg-inherit"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name='location'
                  />
                  <input
                    type="text"
                    placeholder="Occupation"
                    className="input input-bordered w-full max-w-xs bg-inherit"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                    name='occupation'
                  />
                  <div>
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div
                          {...getRootProps()}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Add Picture Here</p>
                          ) : (
                            <div>
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
              className="input input-bordered w-full max-w-xs bg-inherit"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name='email'
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full max-w-xs bg-inherit"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name='password'
            />
          </div>

          {/* Buttons */}
          <div className='flex flex-col py-2'>
            <button
              className="btn btn-wide w-full bg-inherit"
              type='submit'
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </button>

            <div className='divider m-0'></div>

            <p
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