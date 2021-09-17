import { getSession,useSession } from "next-auth/client";
import Header from "../../components/Header";
import styles from "./dashboard.module.css"
import Link from "next/link";






function UserPage() {
    const [session] =useSession();
const{name,email,role,history}= session.user;

const userLink =() =>{
    return(
        <div className="card">
            <h4 className="card-header">User Links</h4>
            <ul className={`list-group ${styles.link}`}>
            <li className="list-group-item">
                <Link clasaname="nav-link" href="/cart"> My Cart</Link>
            </li>
            <li className="list-group-item">
                <Link clasaname="nav-link" href="/profile/update"> Update Profile</Link>
            </li>
           
           
          </ul>


        </div>
    )
}

const userInfo =() =>{
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

const userPurchaseHistory =() =>{
return(
  <div className={`card ${styles.userBody}`} >
  <h3 className="card-header">Purchase history</h3>
  <ul className="list-group">
      {history.length === 0 ? <li className="list-group-item">No History</li> : <li className="list-group-item">{history}</li> }
     </ul>
     </div>
)
}



  return (
    <>
            <Header className="container-fluid" title="Dashboard" description={`Good day ${name} !`}/>
            <div className={styles.infoBody}>

            <div className="row">
              <div className="col-3">{userLink()}</div>
              <div className="col-9">{userInfo()}{userPurchaseHistory()}</div>
            </div>
            </div>
           
  

    </>
  );
}



































export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

export default UserPage;
