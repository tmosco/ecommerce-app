import styles from "./register.module.css";
import FormHeader from "../../components/FormHeader";

import {useForm} from "react-hook-form"


type FormValues ={
    name:String;
    email:String;
    password:String;
};

function RegistrationPage() {


   const {register, handleSubmit, formState:{errors},reset} = useForm<FormValues>();
    const onSubmit = (data) => {
fetch('/api/auth/signup',{
  method:'POST',
  body:JSON.stringify(data),
  headers:{
    'Content-Type':'application/json'
  }

})
.then(response => response.json()
// .then(data=>console.log(data))
);
reset();


    };

 









//     const handleChange =(name) =>(e)=>{
//         setValues({...values,[name]: e.target.value})
// };
    return (
        <>  
         <FormHeader title="Sign Up" description="Register to Super-C pharmacy and store "/>
         <div className={`container col-md-8 offset-md-2 ${styles.header}`}>
             
 
         <form onSubmit ={handleSubmit(onSubmit)}className="justify-content-center">
         <div className="mb-3">
           <label htmlFor="name" className="form-label">Name</label>
           <input {...register("name",{required:true})} type="text" className="form-control"  />
           {errors.name && <p className="formalert" >Please enter name</p>}
          
         </div>
         <div className="mb-3">
           <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
           <input {...register("email", {required:true})} type="email" className="form-control" />
           {errors.password && <p className="formalert" >Please enter a valid Email</p>}
         
         </div>
         <div className="mb-3">
           <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
           <input {...register("password",{required:true})} type="password" className="form-control"  />
         </div>
        
         <button type="submit" className="btn btn-primary">Submit</button>
       </form>
         </div>
 
         </>
    )
}

export default RegistrationPage
