import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { baseUrl } from "../../utils/utils";
import Button from "../atoms/Button/Button";
import FormBlock from "../atoms/FormBlock/FormBlock";
import styles from "./PhoneEditor.module.css";
PhoneEditor.propTypes = {
  phoneID: PropTypes.string,
  closePopover: PropTypes.func,
};

function PhoneEditor({ phoneID, closePopover }) {
  const [phoneData, setPhoneData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPhone = async () => {
      const toastID = toast.loading("Loading Phones");
      setIsLoading(true);
      try {
        const res = await axios.get(`${baseUrl}phones/${phoneID}`);
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

  const sendPhone = async (phoneData) => {
    const toastID = toast.loading("Loading Phones");
    setIsLoading(true);
    try {
      const sentRequest = phoneID
        ? axios.put(`${baseUrl}phones/${phoneID}`, phoneData)
        : axios.post(`${baseUrl}phones/`, phoneData);
      await sentRequest;
      toast.success("Phone saved succesfully", { id: toastID });
      closePopover();
    } catch (error) {
      toast.error(error.message, { id: toastID });
    } finally {
      setIsLoading(false);
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const PhoneData = Object.fromEntries(formData);
    sendPhone(PhoneData);
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
            type="text"
            title="year: 4-digit numbber"
            pattern="[0-9]{4}"
            labelText="Release year:"
            inputName="releaseYear"
            defaultValue={phoneData?.releaseYear || ""}
            required={true}
          />
        </div>
        <div className={styles["form-block"]}>
          <FormBlock
            type="text"
            title="price: number, can be partial"
            pattern="[0-9.]{1,}"
            labelText="Price ($):"
            inputName="price"
            defaultValue={phoneData?.price || ""}
            required={true}
          />
        </div>
        <div className={styles["form-btn-container"]}>
          <Button text="Submit" backgroundColor="dark" type="submit" />
        </div>
      </form>
    </>
  );
}

export default PhoneEditor;
