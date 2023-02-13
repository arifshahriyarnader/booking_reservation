import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import "./resetpassword.css";

const ResetPassword = () => {
    return (
        <div>
            <Navbar />
            <div className='reset-password'>
                <div className='form'>
                <form>
      <label htmlFor="password">
        Password:
        <input
          type="password"
          id="password"
          required
        />
      </label>
      <label htmlFor="confirmPassword">
        Confirm Password:
        <input
          type="password"
          id="confirmPassword"
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;