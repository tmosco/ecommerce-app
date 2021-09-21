import styles from "./category.module.css";
import FormHeader from "../../../components/FormHeader";
import { getSession } from "next-auth/client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

function Category() {
  const [user, setUser] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      if (session) {
        setUser(session.user);
      }
    };
    securePage();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const newData = {
      // email: user.email,
      role: user.role,
      name: data.name.toLowerCase(),
    };
    fetch("/api/category", {
      method: "POST",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSuccess(data.message);
        setError(data.error);
      })
      .catch((err) => setError(err));
  };

  const handleChange = (e) => {
    const name = e.target.value;
    if (name.length === 0) {
      setError("");
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link href="/admin/dashboard">
        <a>Go Back to Dashboard</a>
      </Link>
    </div>
  );

  const showSuccess = () => (
    <div className="alert alert-info">Category Created</div>
  );

  const showError = (error) => <div className="alert alert-danger">{error}</div>;

  return (
    <>
      <FormHeader title="Add new Category" />
      {goBack()}
      <div className={`container col-md-8 offset-md-2 ${styles.header}`}>
        {success && showSuccess()}
        {error && showError(error)}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="justify-content-center"
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              className="form-control"
              onChange={handleChange}
            />
            {errors.name && <p className="formalert">Please enter Category</p>}
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Category;
