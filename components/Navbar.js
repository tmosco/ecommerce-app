import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";



function Navbar() {
  const router = useRouter();
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
          <li className="nav-item">
            <Link href="/homepage">
              <a
                className={router.pathname == "/homepage" ? "active nav-link" : "nav-link"}>
                HomePage
              </a>
            </Link>
          </li>
          
            
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
       

              <li className="nav-item">
                <div
                  onClick={() =>
                    logout(() => {
                      router.push("/");
                    })
                  }
                >
                  <a className={`${styles.logout} nav-link`}>Logout</a>
                </div>
              </li>

        </ul>
      </div>
      </nav>
    </>
  );
}

export default Navbar;
