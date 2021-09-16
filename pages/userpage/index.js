import { getSession,useSession } from "next-auth/client";
import Header from "../../components/Header";
import styles from "./userpage.module.css"
function UserPage() {
    const [session] =useSession();
    console.log(session);
    console.log("hi")
  return (
    <>

            <Header className="container" />
        <div className={`card ${styles.userBody}`} >
          <h2 className="card-header">User Information</h2>
          <ul className="list-group">
            <li className="list-group-item">name</li>
            <li className="list-group-item">email</li>
            <li className="list-group-item">role</li>
          </ul>
        </div>

        <div className={`card ${styles.userBody}`} >
        <h3 className="card-header">Purchase history</h3>
        <ul className="list-group">
            <li className="list-group-item">history</li>

          </ul>

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
