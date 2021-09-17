import styles from "./category.module.css";
import FormHeader from "../../components/FormHeader";
import { getSession } from "next-auth/client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function Category() {
  const [user, setUser] = useState();
  const [error, setError] = useState("");

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
      email: user.email,
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
        // console.log(data.message);
        setError(data.message);
      })
      .catch((err) => setError(err));
  };

  const handleChange = (e) => {
    const name = e.target.value;
    if (name.length === 0) {
      setError("");
    }
  };

  //     const handleChange =(name) =>(e)=>{
  //         setValues({...values,[name]: e.target.value})
  // };
  return (
    <>
      <FormHeader title="Add new Category" />
      <div className={`container col-md-8 offset-md-2 ${styles.header}`}>
        {error && <p className="formalert">{error}</p>}
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
