function FormHeader({ title = "Title", description = "Description" }) {
    return (
      <>
        <div className="container-fluid bg-light p-5">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
      </>
    );
  }
  
  export default FormHeader;