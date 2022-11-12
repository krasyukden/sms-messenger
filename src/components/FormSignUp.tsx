import { Formik } from 'formik';
import React, { useState } from 'react';
import { FC } from 'react';
import s from './formSignUp.module.css'
import * as yup from 'yup';


/* interface IonChange {

  onChange: (_: any, event: any) => void
} */
/* export interface IValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string
} */

/* interface LoginProps {
  handleClickSignUp: (values: IValues) => void
} */

interface LoginProps {
  handleClickSignUp: (email: string, password: string, firstName: string, lastName: string) => void
}

const FormSignUp: FC<LoginProps> = ({ handleClickSignUp }) => {

  const signupSchema = yup.object().shape({
    firstName: yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    password: yup.string()
      .min(6, 'Too Short! Min 6 symbols')
      .max(10, 'Too Long! Max 10 symbols')
      .required('Required'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords do not match')
      .required('Required')
      .min(6, 'Too Short! Min 6 symbols')
      .max(10, 'Too Long! Max 10 symbols')
      .required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
    confirmEmail: yup.string()
      .oneOf([yup.ref('email')], 'Emails do not match')
      .email('Invalid email')
      .required('Required')
  })

  return (
    <div className={s.signUpFormWrapper}>
      <div className={s.headerTitle} >SignUp</div>

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          password: '',
          confirmPassword: '',
          email: '',
          confirmEmail: ''
        }}
        validateOnBlur
        onSubmit={(values) => {

          const { email, password, firstName, lastName } = values;

          handleClickSignUp(email, password, firstName, lastName);

          console.log(email, password)
        }}
        validationSchema={signupSchema}
      >
        {({
          values,
          errors,
          touched,//взаимод ли с ф-мой
          handleChange,
          handleBlur,//срабат если ушли с поля
          isValid,
          handleSubmit,// вызов onSubmit
          dirty//измен ли  парпметрі в ф-ме

        }) => (

          <div className={s.signUp}>
            <p>
              <label htmlFor={'firstName'}>First name</label><br />
              <input className={s.signUpInput}
                type={'text'}
                name={'firstName'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
              />
            </p>
            {touched.firstName && errors.firstName && <p className={s.error}>{errors.firstName}</p>}

            <p>
              <label htmlFor={'lastName'}>Last name</label><br />
              <input className={s.signUpInput}
                type={'text'}
                name={'lastName'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
              />
            </p>
            {touched.lastName && errors.lastName && <p className={s.error}>{errors.lastName}</p>}

            <p>
              <label htmlFor={'password'}>Password</label><br />
              <input className={s.signUpInput}
                type={'password'}
                name={'password'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </p>
            {touched.password && errors.password && <p className={s.error}>{errors.password}</p>}

            <p>
              <label htmlFor={'confirmPassword'}>Confirm password</label><br />
              <input className={s.signUpInput}
                type={'password'}
                name={'confirmPassword'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
              />
            </p>
            {touched.confirmPassword && errors.confirmPassword && <p className={s.error}>{errors.confirmPassword}</p>}

            <p>
              <label htmlFor={'email'}>Email</label><br />
              <input className={s.signUpInput}
                type={'email'}
                name={'email'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </p>
            {touched.email && errors.email && <p className={s.error}>{errors.email}</p>}

            <p>
              <label htmlFor={'confirmEmail'}>Confirm email</label><br />
              <input className={s.signUpInput}
                type={'email'}
                name={'confirmEmail'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmEmail}
              />
            </p>
            {touched.confirmEmail && errors.confirmEmail && <p className={s.error}>{errors.confirmEmail}</p>}
            <button className={s.buttonRegister}
              disabled={!isValid && !dirty}//dirty - никогда не меняли ф-му

              onClick={() => { handleSubmit() }}

              type={'submit'}
            >Register</button>
          </div>
        )}

      </Formik>
    </div>
  )
}

export default FormSignUp;

