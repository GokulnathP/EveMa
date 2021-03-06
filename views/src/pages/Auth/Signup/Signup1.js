import React, { useState, useContext, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';

import signup from '../../../img/signup.jpg';
import classes from './signup.module.css';
import btnclasses from '../../../Layout/button.module.css';

import AuthContext from '../../../context/auth/authContext';

const Signup1 = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setFields({
      ...fields,
      firstname: { value: authContext.firstname, error: '' },
      lastname: { value: authContext.lastname, error: '' },
      state: { value: authContext.state, error: '' },
      country: { value: authContext.country, error: '' },
      zipcode: { value: authContext.zipcode, error: '' },
      city: { value: authContext.city, error: '' },
      dob: { value: authContext.dob, error: '' },
      gender: { value: authContext.gender, error: '' },
    });
    // eslint-disable-next-line
  }, []);

  const initialState = {
    firstname: { value: '', error: '' },
    lastname: { value: '', error: '' },
    state: { value: '', error: '' },
    country: { value: '', error: '' },
    zipcode: { value: '', error: '' },
    city: { value: '', error: '' },
    dob: { value: '', error: '' },
    gender: { value: '', error: '' },
  };

  const [fields, setFields] = useState(initialState);
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

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
    if (fields.firstname.value.length < 3) {
      isError = true;
      fields.firstname.error = 'firstname is atleast 5 character';
    } else {
      fields.firstname.error = '';
    }

    if (fields.lastname.value.length < 3) {
      isError = true;
      fields.lastname.error = 'lastname is atleast 5 character';
    } else {
      fields.lastname.error = '';
    }

    if (fields.state.value.length < 3) {
      isError = true;
      fields.state.error = 'State is required';
    } else {
      fields.state.error = '';
    }

    if (fields.country.value.length < 3) {
      isError = true;
      fields.country.error = 'Country is required';
    } else {
      fields.country.error = '';
    }

    if (fields.city.value.length < 3) {
      isError = true;
      fields.city.error = 'City is required';
    } else {
      fields.city.error = '';
    }

    if (!(/^\d{6}$/.test(fields.zipcode.value))) {
      isError = true;
      fields.zipcode.error = 'Zipcode entered is invalid';
    } else {
      fields.zipcode.error = '';
    }

    if (new Date(fields.dob.value).getTime() > Date.now()) {
      isError = true;
      fields.dob.error = 'Enter a valid Date of birth';
    } else {
      fields.dob.error = '';
    }

    setFields({
      ...fields,
    });

    if (!isError) {
      setLoading(true);
      authContext.updateUser({
        firstname: fields.firstname.value,
        lastname: fields.lastname.value,
        state: fields.state.value,
        country: fields.country.value,
        zipcode: fields.zipcode.value,
        city: fields.city.value,
        dob: fields.dob.value,
        gender: fields.gender.value,
      });
      setIsSubmit(true);
    }
  };
  return (
    <div className={classes['bg-signup-2']}>
      {isSubmit && <Redirect to='/signup/2' />}
      {!authContext.username && <Redirect to='/signup/0' />}
      <div className={classes['signup']}>
        <img src={signup} alt='signup' className={classes['imgLeft']} />
        <form className={classes['form-signup']} onSubmit={handleSubmit}>
          <h1>Personal Details</h1>
          <span className={classes['inputs']}>
            <div className={classes['form_group']}>
              <label htmlFor='firstname'>First Name</label>
              <input
                className={classes['form_input']}
                type='text'
                id='firstname'
                name='firstname'
                value={fields.firstname.value}
                onChange={handleChange}
                placeholder='Firstname'
                required
              />
              <h6>{fields.firstname.error}</h6>
            </div>
            <div className={classes['form_group']}>
              <label htmlFor='lastname'>Last Name</label>
              <input
                className={classes['form_input']}
                type='text'
                id='lastname'
                name='lastname'
                value={fields.lastname.value}
                onChange={handleChange}
                placeholder='Lastname'
                required
              />
              <h6>{fields.lastname.error}</h6>
            </div>
            <div className={classes['form_group']}>
              <label htmlFor='state'>State</label>
              <input
                className={classes['form_input']}
                type='text'
                id='state'
                name='state'
                value={fields.state.value}
                onChange={handleChange}
                placeholder='State'
                required
              />
              <h6>{fields.state.error}</h6>
            </div>

            <div className={classes['form_group']}>
              <label htmlFor='country'>Country</label>
              <input
                className={classes['form_input']}
                type='text'
                id='country'
                name='country'
                value={fields.country.value}
                onChange={handleChange}
                placeholder='Country'
                required
              />
              <h6>{fields.country.error}</h6>
            </div>
            <div className={classes['form_group']} id='check'>
              <label htmlFor='city'>City</label>
              <input
                className={classes['form_input']}
                type='text'
                id='city'
                name='city'
                value={fields.city.value}
                onChange={handleChange}
                placeholder='City'
                required
              />
              <h6>{fields.city.error}</h6>
            </div>
            <div className={classes['form_group']}>
              <label htmlFor='zipcode'>Zipcode</label>
              <input
                className={classes['form_input']}
                type='text'
                id='zipcode'
                name='zipcode'
                value={fields.zipcode.value}
                onChange={handleChange}
                placeholder='Zipcode'
                required
              />
              <h6>{fields.zipcode.error}</h6>
            </div>
            <div className={classes['form_group']}>
              <label htmlFor='dob'>Date of Birth</label>
              <input
                type='date'
                id='dob'
                required
                name='dob'
                value={fields.dob.value}
                onChange={handleChange}
                className={classes['form_input']}
              />
              <h6>{fields.dob.error}</h6>
            </div>
            <div className={classes['form_group']}>
              <label htmlFor='gender'>Gender</label>
              <span>
                <select
                  required
                  value={fields.gender.value}
                  name='gender'
                  onChange={handleChange}
                  className='custom-select'
                  id='gender'
                >
                  <option value=''>Choose...</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Others'>Others</option>
                </select>
              </span>
            </div>

            <Link to='/signup/0'>
              <button
                type='button'
                className={[
                  'btn btn-primary btn-block',
                  btnclasses.link,
                  btnclasses.next,
                  btnclasses['btn-primary'],
                ].join(' ')}
                style={{boxShadow: "3px 3px 3px rgba(0,0,0,0.50)"}}
              >
                Back
              </button>
            </Link>
            {loading ? (
              <button
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
                  'btn btn-primary btn-block ',
                  classes.next,
                  classes.link,
                  classes['btn-primary'],
                ].join(' ')}
                style={{boxShadow: "3px 3px 3px rgba(0,0,0,0.50)"}}
              >
                Next
              </button>
            )}
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup1;
