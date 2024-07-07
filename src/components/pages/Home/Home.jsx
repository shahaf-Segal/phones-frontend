import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useQuery from "../../../hooks/useQuery";
import { baseUrl } from "../../../utils/utils";
import Button from "../../atoms/Button/Button";
import Icon from "../../atoms/Icon/Icon";
import Popover from "../../atoms/Popover/Popover";
import Pagination from "../../molecules/Pagination/Pagination";
import Table from "../../molecules/Table/Table";
import PhoneEditor from "../../PhoneEditor/PhoneEditor";
import styles from "./Home.module.css";

function Home() {
  const [phonesArray, setPhonesArray] = useState([]);
  const [pagesData, setPagesData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [popoverElement, setPopoverElement] = useState();

  const query = useQuery();

  const getPhones = async () => {
    const toastID = toast.loading("Loading Phones");
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${baseUrl}phones?/`);
      setPhonesArray(data.phones);
      setPagesData(data.pages);
      toast.dismiss(toastID);
    } catch (error) {
      toast.error(error.message, { id: toastID });
    } finally {
      setIsLoading(false);
    }
  };

  const closePopover = () => {
    setPopoverElement(null);
    getPhones();
  };

  //add query later
  useEffect(() => {
    if (!isLoading) {
      getPhones();
    }
  }, []);

  const columns = [
    {
      header: "Model",
      cellContent: "model",
      width: "10%",
      textAlign: "center",
    },
    {
      header: "Brand",
      cellContent: "brand",
      width: "10%",
      textAlign: "center",
    },
    {
      header: "Year",
      cellContent: "releaseYear",
      width: "8%",
      textAlign: "center",
    },
    {
      header: "Price",
      cellContent: <p />,
      width: "8%",
      textAlign: "center",
      propsMapping: (data) => ({
        children: `${data.price}$`,
      }),
    },
    {
      header: "OS",
      cellContent: "os",
      width: "8%",
      textAlign: "center",
    },
    {
      header: "Edit",
      cellContent: (
        <Button
          icon={<Icon name="EditBtnIcon" color="var(--light-text-color)" />}
          fullWidth={true}
        />
      ),
      width: "15%",
      propsMapping: (data) => {
        return {
          onClick: () => {
            setPopoverElement(
              <PhoneEditor phoneID={data._id} closePopover={closePopover} />
            );
          },
        };
      },
    },
  ];

  return (
    <div>
      <div className={styles["top-bar"]}>
        <div className={styles["top-bar-btn"]}>
          <Button
            text="Add Phone"
            icon={<Icon name="AddIcon" color="var(--light-text-color)" />}
            onClick={() => {
              setPopoverElement(<PhoneEditor closePopover={closePopover} />);
            }}
            fullWidth
          />
        </div>
      </div>
      <div className={styles["table-container"]}>
        {isLoading || <Table columns={columns} data={phonesArray} />}
        <Pagination currentPage={1} totalPages={3} />
      </div>

      <Popover isPopoverOpen={Boolean(popoverElement)} onClose={closePopover}>
        {popoverElement}
      </Popover>
    </div>
  );
}

export default Home;
