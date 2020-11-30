import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import HomepageHeader from './HomepageHeader';

import { Formik } from "formik";
import * as Yup from "yup";

const Signup = () => (
  <Formik
    initialValues={{
		name: "",
		firstname: "",
		email: "",
		password: "",
		role: "user"
	 }}
    onSubmit={(values, { setSubmitting }) => {
		axios.post("http://localhost:3000/api/user/signup",values )
			.then(res => {
				window.location = "/";
			})
			.catch(error => {
				alert({ message : 'Email déjà existant' });
			});

      setTimeout(() => {
        setSubmitting(false);
      }, 500);
	}}
	
	validationSchema={Yup.object().shape({
		name: Yup.string()
		  .required("Requis."),
		firstname: Yup.string()
		  .required("Requis."),
		email: Yup.string()
		  .email()
		  .required("Requis."),
		password: Yup.string()
		  .required("Aucun mot de passe.")
		  .min(5, "Mot de passe trop court - 5 caractéres minimum")
		  .matches(/(?=.*[0-9])/, "Doit contenir un chiffre.")
	  })}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;

      return (
		<div>
			<HomepageHeader />
			<form onSubmit={handleSubmit}>
					
					<h3>Remplissez le formulaire pour vous inscrire</h3>

				<label htmlFor="name">name</label>
				<input
				id="name"
				name="name"
				type="text"
				placeholder="Enter your name"
				value={values.name}
				onChange={handleChange}
				onBlur={handleBlur}
				className={errors.name && touched.name && "error"}
				/>
				{errors.name && touched.name && (
				<div className="input-feedback">{errors.name}</div>
				)}

				<label htmlFor="firstname">firstname</label>
				<input
				id="firstname"
				name="firstname"
				type="text"
				placeholder="Enter your firstname"
				value={values.firstname}
				onChange={handleChange}
				onBlur={handleBlur}
				className={errors.firstname && touched.firstname && "error"}
				/>
				{errors.firstname && touched.firstname && (
				<div className="input-feedback">{errors.firstname}</div>
				)}

				<label htmlFor="email">Email</label>
				<input
				id="email"
				name="email"
				type="text"
				placeholder="Enter your email"
				value={values.email}
				onChange={handleChange}
				onBlur={handleBlur}
				className={errors.email && touched.email && "error"}
				/>
				{errors.email && touched.email && (
				<div className="input-feedback">{errors.email}</div>
				)}
		
				<label htmlFor="password">Password</label>
				<input
				id="password"
				name="password"
				type="password"
				placeholder="Enter your password"
				value={values.password}
				onChange={handleChange}
				onBlur={handleBlur}
				className={errors.password && touched.password && "error"}
				/>
				{errors.password && touched.password && (
				<div className="input-feedback">{errors.password}</div>
				)}

		
				<button type="submit" disabled={isSubmitting}>
				S'inscrire
				</button>
				<div>
					<p>Vous avez déjà un compte ?</p>
					<div className="homepage-link">
						<NavLink to="/"><span className="link">Cliquez ici !</span></NavLink>
					</div>
				</div>
			</form>
	  </div>
      );
    }}
  </Formik>

);

export default Signup;