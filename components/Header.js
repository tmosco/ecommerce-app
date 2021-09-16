import styles from "../styles/Header.module.css"
function Header() {
    return (
        <div className={`container-fluid bg-light  ${styles.header}`}>
        <h2 className="display-4"></h2>
        <p className="lead"></p>
      </div>
    )
}

export default Header
