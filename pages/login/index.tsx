import styles from "./login.module.css";
import {useState} from "react";
import FormHeader from "../../components/FormHeader";
import {useForm} from "react-hook-form";
import {signIn}from 'next-auth/client';



type FormValues ={
    email:String;
    password:String;
};

function LoginPage() {
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false);
const {register, handleSubmit, formState:{errors},reset} = useForm<FormValues>();
   const onSubmit = (data) => {
  signIn('credentials',{
  redirect:false,
  email:data.email,
  password :data.password


})
.then(data=>{
  if (data.error){
    setError(data.error);
  }else{
    setIsLogin(true);
  }
})
  

    };

    return (
        <>  
         <FormHeader title="Login" description="Login to Super-C pharmacy and store "/>
         <div className={`container col-md-8 offset-md-2 ${styles.header}`}>
             
 {error && <p className="formalert" >{error}</p>}
         <form onSubmit ={handleSubmit(onSubmit)}className="justify-content-center">

         <div className="mb-3">
           <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
           <input {...register("email", {required:true})} type="email" className="form-control" />
           {errors.email && <p className="formalert" >Please enter a valid Email</p>}
           
         
         </div>
         <div className="mb-3">
           <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
           <input {...register("password",{required:true})} type="password" className="form-control"  />
           {errors.password && <p className="formalert" >Please enter Password</p>}
         </div>
        
         <button type="submit" className="btn btn-primary">Submit</button>
       </form>
         </div>
 
         </>
    )
}

export default LoginPage;

