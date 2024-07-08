import Icon from "../atoms/Icon/Icon";
import styles from "./NavBar.module.css";
import NavigateLink from "./NavigateLink/NavigateLink";

function NavBar() {
  const navLinks = (
    <>
      <NavigateLink to={"/"} text={"Home"} />
    </>
  );

  return (
    <div className={styles["nav-bar"]}>
      <div className={styles["logo container"]}>
        <Icon
          name="PhoneCallIcon"
          width={30}
          height={30}
          color="var(--purple-color)"
        />
      </div>
      <div className={styles["page-navigation"]}>{navLinks}</div>
    </div>
  );
}

export default NavBar;
