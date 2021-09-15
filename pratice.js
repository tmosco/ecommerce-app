<>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
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





import styles from "./register.module.css";

function RegistrationPage() {
    return (
        <>
        
 <div>

 </div>
 
        
         <div classNameName={`container col-md-8 offset-md-2 ${styles.header}`}>

 
         <form className="form-horizontal" action='' method="POST">
  <fieldset>
    <div id="legend">
      <legend className="">Register</legend>
    </div>
    <div className="control-group">
  
      <label className="control-label"  for="username">Username</label>
      <div className="controls">
        <input type="text" id="username" name="username" placeholder="" className="input-xlarge"/>
        <p className="help-block">Username can contain any letters or numbers, without spaces</p>
      </div>
    </div>
 
    <div className="control-group">
 
      <label className="control-label" for="email">E-mail</label>
      <div className="controls">
        <input type="text" id="email" name="email" placeholder="" className="input-xlarge"/>
        <p className="help-block">Please provide your E-mail</p>
      </div>
    </div>
 
    <div className="control-group">

      <label className="control-label" for="password">Password</label>
      <div className="controls">
        <input type="password" id="password" name="password" placeholder="" className="input-xlarge"/>
        <p className="help-block">Password should be at least 4 characters</p>
      </div>
    </div>
 
    <div className="control-group">
 
      <label className="control-label"  for="password_confirm">Password (Confirm)</label>
      <div className="controls">
        <input type="password" id="password_confirm" name="password_confirm" placeholder="" className="input-xlarge"/>
        <p className="help-block">Please confirm password</p>
      </div>
    </div>
 
    <div className="control-group">
      <div className="controls">
        <button className="btn btn-success">Register</button>
      </div>
    </div>
  </fieldset>
</form>
         </div>
 
         </>
    )
}

export default RegistrationPage
