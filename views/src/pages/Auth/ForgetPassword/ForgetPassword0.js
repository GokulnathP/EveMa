import React, { useState, useContext, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import swal from 'sweetalert';

import classes from '../Login/login.module.css';
import btnclasses from '../../../Layout/button.module.css';

import axios from 'axios';
import url from '../../../server.js';

import AuthContext from '../../../context/auth/authContext';

const ForgetPassword0 = () => {
  const authContext = useContext(AuthContext);

  const initialState = {
    email: { value: '', error: '' },
  };

  const [fields, setFields] = useState(initialState);
  const [isSubmit, setisSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFields({
      ...fields,
      email: { value: authContext.email, error: '' },
    });
    // eslint-disable-next-line
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedField = {
      ...fields[name],
    };

    updatedField.value = value;

    setFields({
      ...fields,
      [name]: updatedField,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let isError = false;
    if (fields.email.value.length < 5) {
      isError = true;
      fields.email.error = 'Email is Invalid';
    } else {
      fields.email.error = '';
    }

    setFields({
      ...fields,
    });
    if (!isError) {
      setLoading(true);
      authContext.forgetPassword({
        email: fields.email.value,
      });
      let forgetpwurl = url + 'user/forgetPassword';
      let data = {
        emailId: fields.email.value,
      };
      axios
        .post(forgetpwurl, data)
        .then((res) => {
          setisSubmit(true);
          setLoading(false);
          swal('OTP Sent', 'Check your registered Email Address', 'success');
        })
        .catch((err) => {
          setLoading(false);
          swal('Something Wrong', 'You not signed up', 'error');
        });
    }
  };

  return (
    <div className={classes['bg-login']}>
      {localStorage.getItem('token') && <Redirect to='/' />}
      {isSubmit && <Redirect to='/forgetpassword/1' />}
      <div className={classes['forget']}>
        <form className={classes['form-login']} onSubmit={handleSubmit}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>
            Forgot Password
          </h2>
          <span className={classes['inputs-login']}>
            <div className={classes['form_group']}>
              <input
                className={classes['form_input']}
                type='email'
                name='email'
                value={fields.email.value}
                placeholder='Enter your Email'
                required
                onChange={handleChange}
              />
              <h6>{fields.email.error}</h6>
            </div>
            <div>
              {loading ? (
                <button
                  type='button'
                  className={[
                    'btn btn-primary btn-block',
                    btnclasses.next,
                    btnclasses.link,
                    btnclasses['btn-primary'],
                  ].join(' ')}
                  disable={loading}
                >
                  Loading
                </button>
              ) : (
                  <button
                    type='submit'
                    className={[
                      'btn btn-primary btn-block',
                      btnclasses.next,
                      btnclasses.link,
                      btnclasses['btn-primary'],
                    ].join(' ')}
                    style={{ boxShadow: "3px 3px 3px rgba(0,0,0,0.50)" }}
                  >
                    Next
                  </button>
                )}
              <Link to='/login'>
                <button
                  type='button'
                  className={['btn btn-primary', btnclasses['btn-primary']].join(' ')}
                  style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}
                >
                  Cancel
            </button>
              </Link>
            </div>
          </span>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword0;
