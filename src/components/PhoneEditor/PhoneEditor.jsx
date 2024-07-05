import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { baseUrl } from "../../utils/utils";
import FormBlock from "../atoms/FormBlock/FormBlock";
import styles from "./PhoneEditor.module.css";
PhoneEditor.propTypes = {
  phoneID: PropTypes.string,
};

function PhoneEditor({ phoneID }) {
  const [phoneData, setPhoneData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPhone = async () => {
      const toastID = toast.loading("Loading Phones");
      setIsLoading(true);
      try {
        const res = await axios.get(`${baseUrl}phones/${phoneID}`);
        console.log(res);
        setPhoneData(res.data);
        toast.dismiss(toastID);
      } catch (error) {
        toast.error(error.message, { id: toastID });
      } finally {
        setIsLoading(false);
      }
    };
    setPhoneData(null);
    if (phoneID) {
      fetchPhone();
    } else {
      setPhoneData({});
    }
  }, [phoneID]);

  console.log(phoneData);
  return (
    <>
      <form className={styles["phone-editor"]}>
        <FormBlock></FormBlock>
      </form>
    </>
  );
}

export default PhoneEditor;
