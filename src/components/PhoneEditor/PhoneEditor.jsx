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

  const formSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form className={styles["phone-editor"]} onSubmit={formSubmit}>
        <div className={styles["form-block"]}>
          <FormBlock
            type="text"
            labelText="Model:"
            inputName="model"
            defaultValue={phoneData?.model || ""}
            required={true}
          />
        </div>
        <div className={styles["form-block"]}>
          <FormBlock
            type="text"
            labelText="Brand:"
            inputName="brand"
            defaultValue={phoneData?.brand || ""}
            required={true}
          />
        </div>
        <div className={styles["form-block"]}>
          <FormBlock
            type="text"
            labelText="Operating System:"
            inputName="os"
            defaultValue={phoneData?.os || ""}
            required={true}
          />
        </div>
        <div className={styles["form-block"]}>
          <FormBlock
            type="number"
            labelText="Release year:"
            inputName="releaseYear"
            defaultValue={phoneData?.releaseYear || ""}
            required={true}
          />
        </div>
        <div className={styles["form-block"]}>
          <FormBlock
            type="number"
            labelText="Price ($):"
            inputName="price"
            defaultValue={phoneData?.price || ""}
            required={true}
          />
        </div>
      </form>
    </>
  );
}

export default PhoneEditor;
