import { getSession } from "next-auth/client";
import React, { useState, useEffect } from "react";
import { get, set, useForm } from "react-hook-form";

import ProductForm from "../../../components/ProductForm/productForm";
import { AdminAuth } from "../../../components/AdminAuth";

function Product() {
  useEffect(() => {
    getCategory();
  }, []);

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState();

  const user = AdminAuth();

  const getCategory = () => {
    return fetch("/api/category", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.result);
      })
      .catch((err) => setMessage(err));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const newData = {
      id: user._id,
      role: user.role,
      data: data,
    };
    fetch("/api/product", {
      method: "POST",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccess(data.message);
        setError(data.error);
      })
      .catch((err) => setError(err));
      reset();
  };

  const handleChange = (e) => {
    const name = e.target.value;
    if (name.length === 0) {
      setError("");
    }
  };

  return (
    <>
      <ProductForm
        onSubmit={onSubmit}
        handleChange={handleChange}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        categories={categories}
        error={error}
        success={success}
      />
    </>
  );
}

export default Product;
