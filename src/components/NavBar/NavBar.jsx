import styles from "./NavBar.module.css";
import NavigateLink from "./NavigateLink/NavigateLink";

function NavBar() {
  const navLinks = (
    <>
      <NavigateLink to={"/"} text={"Home"} />
      <NavigateLink to={"/auth"} text={"Login/Sign Up"} />
    </>
  );

  return (
    <div className={styles["nav-bar"]}>
      <div className={styles["logo container"]}></div>
      <div className={styles["page-navigation"]}>{navLinks}</div>
      <div className={styles["contact-btn"]}></div>
    </div>
  );
}

export default NavBar;
