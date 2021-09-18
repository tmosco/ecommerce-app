import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";
import {useSession, signout} from 'next-auth/client';
import { useState } from 'react';




function Navbar() {

  const [session, loading] = useSession();

  const router = useRouter();

  function logoutHandler(){
    router.push('/login')
signout();
  }

  return (
    <>
<nav className={`navbar navbar-expand-lg navbar-dark bg-dark `}>
  <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href="/">
              <a
                className={router.pathname == "/" ? "active nav-link" : "nav-link"}>
                Home
              </a>
            </Link>
          </li>
          {session && 
          <li className="nav-item">
            <Link href="/user/dashboard">
              <a
                className={router.pathname == "/user/dashboard" ? "active nav-link" : "nav-link"}>
                DashBoard
              </a>
            </Link>
          </li>
                }
          
            {!session && !loading? <>
              <li className='nav-item"'>
                <Link href="/login">
                  <a
                    className={
                      router.pathname == "/login"? "active nav-link" : "nav-link"}>
                    Login
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/register">
                  <a
                    className={router.pathname == "/register"? "active nav-link": "nav-link"} >
                    Sign up
                  </a>
                </Link>
              </li>
              </>
       
       :
       <li className="nav-item">
                <div
                  onClick={logoutHandler} >
                  <a className={`${styles.logout} nav-link`}>Logout</a>
                </div>
              </li>
              }

        </ul>
      </div>
      </nav>
    </>
  );
}

// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: true,
//       }, 
//     };
//   }
//   return {
//     props: { session },
//   };
// }

export default Navbar;
