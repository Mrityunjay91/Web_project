import React, { useState } from 'react';
import './Login.css';
import user from '../Components/user.png';
import emails from '../Components/email.png';
import passwords from '../Components/password.png';
import ages from '../Components/age.png';

const Login = () => {
  const [action, setAction] = useState("SignUp");
  const [userData, setUserData] = useState({ firstname: '', lastname: '', email: '', age: '', password: '', name: '' });
  const [array, setArray] = useState();
  const [editIndex, setEditIndex] = useState(-1);
  const [ErrorData, setErrorData] = useState({ firstname: '', lastname: '', email: '', age: '', password: '', name: '' });

  const handleChange = (e) => {
    setErrorData({ ...ErrorData, [e.target.name]: '' });
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const Change = () => {
    if (editIndex === -1) {

      setArray([...array, userData]);
    } else {
      const updatedArray = array.map((item, index) =>
        index === editIndex ? userData : item
      );

      setArray(updatedArray);
      setEditIndex(-1);
    }
    setUserData({ firstname: "", lastname: "", name: "", age: "", email: "", password: "" });
  };

  const handleEdit = (index) => {
    setUserData(array[index]);
    setEditIndex(index);
    setAction("SignUp");
  };

  const handleDelete = (index) => {
    const updatedArray = array.filter((_, ind) => ind !== index);
    localStorage.setItem('arraysave', JSON.stringify(array.filter))
    return {
      ...updatedArray,
      array: array.filter
    }
  };

  const nameValid = () => {
    if (userData.name.length <= 6 || userData.name.length >= 15) {
      setErrorData((prevErrorData) => ({
        ...prevErrorData,
        name: 'Name must be between 7 and 14 characters'
      }));
    }
  };

  const firstnameValid = () => {
    if (userData.firstname.length <= 4 || userData.firstname.length >= 10) {
      setErrorData((prevErrorData) => ({
        ...prevErrorData,
        firstname: 'First name must be between 5 and 9 characters'
      }));
    }
  };

  const lastnameValid = () => {
    if (userData.lastname.length <= 4 || userData.lastname.length >= 10) {
      setErrorData((prevErrorData) => ({
        ...prevErrorData,
        lastname: 'Last name must be between 5 and 9 characters'
      }));
    }
  };

  const validateemail = () => {
    const patterns = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!patterns.test(userData.email)) {
      setErrorData((prevErrorData) => ({
        ...prevErrorData,
        email: 'email most have @gamil.com'
      }));
    }
  };

  const validatePassword = () => {
    const pattern = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!pattern.test(userData.password)) {
      setErrorData((prevErrorData) => ({
        ...prevErrorData,
        password: 'Password must be at least 8 characters long and include at least one letter, one number, and one special character'
      }));
    }
  };



  return (
    <>
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "SignUp" && (
            <>
              <div className="input">
                <img className="png" src={user} alt="" />
                <input type="text" placeholder='Name' value={userData?.name} name='name' onBlur={nameValid} onChange={handleChange} />

                {ErrorData.name && <p style={{ color: 'red' }}>{ErrorData.name}</p>}
              </div>
              <div className='input'>
                <img className="png" src={user} alt="" />
                <input type='text' placeholder='firstname' name='firstname' onBlur={firstnameValid} value={userData?.firstname} onChange={handleChange} />
                {ErrorData.name && <p style={{ color: 'red' }}>{ErrorData.name}</p>}


              </div>
              <div className='input'>
                <img className="png" src={user} alt="" />
                <input type='text' placeholder='lastname' name='lastname' onBlur={lastnameValid} value={userData?.lastname} onChange={handleChange} />

                {ErrorData.name && <p style={{ color: 'red' }}>{ErrorData.name}</p>}

              </div>
              <div className="input">
                <img className='png' src={ages} alt='' />
                <input type="number" placeholder='age' name='age' value={userData?.age} onChange={handleChange} />
              </div>
            </>
          )}
          <div className="input">
            <img className="png" src={emails} alt="" />
            <input type="text" placeholder='Email Id' name='email' onBlur={validateemail} value={userData?.email} onChange={handleChange} />
            {ErrorData.email && <p style={{ color: 'red' }}>{ErrorData.email}</p>}
          </div>
          <div className="input">
            <img className="png" src={passwords} alt="" />
            <input type="text" placeholder='Password' name='password' onBlur={validatePassword} value={userData?.password} onChange={handleChange} />
            {ErrorData.password && <p style={{ color: 'red' }}>{ErrorData.password}</p>}
          </div>
        </div>
        {action === "Login" && (
          <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
        )}
        <div className="submit-container d-flex justify-content-between p-4">
          <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => {
            Change();
            setAction("SignUp");
          }}>Sign Up</div>
          <div className={action === "SignUp" ? "submit gray" : "submit"} onClick={() => {
            setAction("Login");
          }}>Log In</div>
        </div>
      </div>

      <table border={1} width="50%" cellPadding={10}>
        <thead>
          <tr>
            <td>First Name</td>
            <td>Last Name</td>
            <td>User Name</td>
            <td>Age</td>
            <td>Email</td>
            <td>Password</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {array && array.map((info, ind) => (
            <tr key={ind}>
              <td>{info.firstname}</td>
              <td>{info.lastname}</td>
              <td>{info.name}</td>
              <td>{info.age}</td>
              <td>{info.email}</td>
              <td>{info.password}</td>
              <td>
                <button onClick={() => handleEdit(ind)}>Edit</button>
                <button onClick={() => handleDelete(ind)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Login;