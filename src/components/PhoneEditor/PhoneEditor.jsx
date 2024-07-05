import PropTypes from 'prop-types"';
import { useEffect, useState } from "react";
import FormBlock from "../atoms/FormBlock/FormBlock";
import styles from "./PhoneEditor.module.css";
PhoneEditor.propTypes = {
  phoneID: PropTypes.string,
};

function PhoneEditor({ phoneID }) {
  const [phoneData, setPhoneData] = useState(null);
  useEffect(() => {
    const fetchPhone = async () => {};

    setPhoneData(null);
    if (phoneID) {
      fetchPhone();
    } else {
      setPhoneData({});
    }
  }, [phoneID]);
  return (
    <>
      <form className={styles["phone-editor"]}>
        <FormBlock></FormBlock>
      </form>
    </>
  );
}

export default PhoneEditor;
