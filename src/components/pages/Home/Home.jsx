import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  replaceNonAlphanumeric,
  revertStringReplacement,
} from "../../../functions/nonAlphaTranslate";
import useQuery from "../../../hooks/useQuery";
import { baseUrl } from "../../../utils/utils";
import Button from "../../atoms/Button/Button";
import Icon from "../../atoms/Icon/Icon";
import Popover from "../../atoms/Popover/Popover";
import Spinner from "../../atoms/Spinner/Spinner";
import Pagination from "../../molecules/Pagination/Pagination";
import Table from "../../molecules/Table/Table";
import PhoneEditor from "../../PhoneEditor/PhoneEditor";
import styles from "./Home.module.css";

function Home() {
  const [phonesArray, setPhonesArray] = useState([]);
  const [pagesData, setPagesData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [popoverElement, setPopoverElement] = useState();
  const nav = useNavigate();
  const query = useQuery();

  const getQuerySearch = () => {
    const querySearch = query.get("search") || "";
    return revertStringReplacement(querySearch);
  };
  const [searchString, setSearchString] = useState(getQuerySearch());

  const queryToUsableQuery = () => {
    const queryObject = { page: "", search: "" };
    const queryArray = [];
    Object.keys(queryObject).forEach((key) => {
      const queryValue =
        query.get(key) && revertStringReplacement(query.get(key));
      if (queryValue) {
        queryArray.push(`${key}=${replaceNonAlphanumeric(queryValue)}`);
      }
    });
    return queryArray.join("&");
  };

  const getPhones = async () => {
    const toastID = toast.loading("Loading Phones");
    setIsLoading(true);
    const queryString = queryToUsableQuery();
    nav(`/?${queryString}`);
    try {
      const { data } = await axios.get(`${baseUrl}phones?${queryString}`);
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

  useEffect(() => {
    if (pagesData) {
      query.set("page", pagesData.current);
    }
  }, [pagesData, query]);

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
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles["table-container"]}>
          <Table columns={columns} data={phonesArray} />
          {pagesData && (
            <Pagination
              currentPage={pagesData.current}
              totalPages={pagesData.total}
            />
          )}
        </div>
      )}

      <Popover isPopoverOpen={Boolean(popoverElement)} onClose={closePopover}>
        {popoverElement}
      </Popover>
    </div>
  );
}

export default Home;
