import FormHeader from "../FormHeader";
import { useState } from 'react';


import Link from "next/link";

function ProductForm({
  handleChange,
  onSubmit,
  register,
  handleSubmit,
  errors,
  categories,
  response,
}) {
const [error, setError] = useState(false);
const [success, setSuccess] = useState(false);

console.log("error",error);
console.log("success",success);


  const checkError = (response) => {
    if (response) {
      if (response.success === false) {
        setError(true);
      } else if (response.success === true) {
        setSuccess(true)
      } else {
        console.log("none");
      }
    }
  };
checkError(response);
  const newPhotoForm = () => (
    <form action="" className="mb-3">
      <h4>Photo</h4>
      <div className="form-group">
        <label htmlFor="photo" className="btn btn-secondary">
          <input type="file" name="photo" accept="image/*" />
        </label>
      </div>
    </form>
  );

  const goBack = () => (
    <div className="mt-5">
      <Link href="/admin/dashboard">
        <a>Go Back to Dashboard</a>
      </Link>
    </div>
  );

  const showSuccess = () => (
    <div className="alert alert-info">
      <h2>Product Created</h2> !
    </div>
  );

  const showError = (response) => (
    <div className="alert alert-danger">{response.message}</div>
  );
  return (
    <>
      <FormHeader title="Add new Product" />
      {goBack()}
      <div className={`container col-md-8 offset-md-2 `}>
        {success && showSuccess()}
        {error &&  showError(response)} 


        <form
          onSubmit={handleSubmit(onSubmit)}
          className="justify-content-center"
        >
          <div className="mb-3">
            <label htmlFor="delivery" className="form-label">
              Name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              className="form-control"
              onChange={handleChange}
            />
            {errors.name && (
              <p className="formalert">Please enter Product name</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              {...register("description", { required: true })}
              type="text"
              className="form-control"
              onChange={handleChange}
            />
            {errors.description && (
              <p className="formalert">Please enter Description</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              {...register("price", { required: true, valueAsNumber: true })}
              type="number"
              className="form-control"
              onChange={handleChange}
            />
            {errors.price && (
              <p className="formalert">Please enter the Price</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">
              Quantity
            </label>
            <input
              {...register("quantity", { required: true, valueAsNumber: true })}
              type="number"
              className="form-control"
              onChange={handleChange}
            />
            {errors.quantity && (
              <p className="formalert">Please enter quantity</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="categories" className="form-label">
              Category
            </label>
            <select
              {...register("categories")}
              className="form-control"
              onChange={handleChange}
            >
              <option>Please Select</option>
              {categories &&
                categories.map((c, i) => (
                  <option value={c._id}>{c.name}</option>
                ))}
            </select>

            {errors.category && (
              <p className="formalert">Please enter Category</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="delivery" className="form-label">
              Delivery
              <select
                className="ms-3"
                {...register("delivery")}
                onChange={handleChange}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </label>
          </div>
          {newPhotoForm()}
          <button type="submit" className="btn btn-primary">
            Create Product
          </button>
        </form>
      </div>
    </>
  );
}

export default ProductForm;
