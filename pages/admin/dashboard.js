import { getSession,useSession } from "next-auth/client";
import Header from "../../components/Header";
import styles from "./dashboard.module.css"
import Link from "next/link";
import {useRouter} from 'next/router';
import {useState, useEffect} from "react";






function AdminPage() {
    const router = useRouter()



    useEffect(()=>{
        // getSession().then((session)=>{
        //   if (session.user.role === 0){
        //     router.replace('/login');
        // }

        // })
        const securePage =async() =>{
const session = await getSession()
if(session.user.role === 0){
    router.replace('/login')

}
        }
        securePage();

        },[router]);
        







    
    const [session] =useSession();
const{name,email,role,history}= session.user;

const adminLink =() =>{
    return(
        <div className="card">
            <h4 className="card-header">User Links</h4>
            <ul className={`list-group ${styles.link}`}>
            <li className="list-group-item">
                <Link clasaname="nav-link" href="/create/category"> Create Category</Link>
            </li>
            <li className="list-group-item">
                <Link clasaname="nav-link" href="/create/product"> Create Product</Link>
            </li>
           
           
          </ul>


        </div>
    )
}

const adminInfo =() =>{
  return(
    <>
    <div className={`card ${styles.userBody}`} >
    <h2 className="card-header">User Information</h2>
    <ul className="list-group">
      <li className="list-group-item">{name}</li>
      <li className="list-group-item">{email}</li>
      <li className="list-group-item">{role ===1 ? "Admin": "Registered User"}</li>
    </ul>
  </div>


     </>
  )
}




  return (
    <>
            <Header className="container-fluid" title="Dashboard" description={`Good day ${name} !`}/>
            <div className={styles.infoBody}>

            <div className="row">
              <div className="col-3">{adminLink()}</div>
              <div className="col-9">{adminInfo()}</div>
            </div>
            </div>
           
  

    </>
  );
}



































export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
//   const isAdmin= await session.user.role;


  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      }, 
    };
  }
  return {
    props: { session },
  };
}

export default AdminPage;
