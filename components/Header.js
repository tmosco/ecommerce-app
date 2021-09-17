import styles from "../styles/Header.module.css"
function Header({title, description="", children}) {
    return (
        <div className={`container-fluid bg-light  ${styles.header}`}>
        <h2 className="display-4">{title}</h2>
        <div className={styles.description}>{description}</div>
      </div>
    )
}

export default Header
