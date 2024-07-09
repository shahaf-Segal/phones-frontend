import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  replaceNonAlphanumeric,
  revertStringReplacement,
} from "../../../functions/nonAlphaTranslate";
import { extractSortNumber, getSortObj } from "../../../functions/sortNumber";
import useQuery from "../../../hooks/useQuery";
import { baseUrl } from "../../../utils/utils";
import Button from "../../atoms/Button/Button";
import ConfirmBox from "../../atoms/ConfirmBox/ConfirmBox";
import Icon from "../../atoms/Icon/Icon";
import Popover from "../../atoms/Popover/Popover";
import { SearchBar } from "../../atoms/SearchBar/SearchBar";
import Spinner from "../../atoms/Spinner/Spinner";
import Pagination from "../../molecules/Pagination/Pagination";
import Table from "../../molecules/Table/Table";
import PhoneEditor from "../../PhoneEditor/PhoneEditor";
import EditDeleteBtn from "./EditDeleteBtn/EditDeleteBtn";
import styles from "./Home.module.css";

function Home() {
  const [phonesArray, setPhonesArray] = useState([]);
  const [pagesData, setPagesData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [popoverElement, setPopoverElement] = useState();
  const [confirmToastId, setConfirmToastId] = useState("");
  const [sortObj, setSortObj] = useState({ sortBy: "price", sortOrder: "asc" });

  const nav = useNavigate();
  const query = useQuery();

  const changePageNumber = (pageNumber) => {
    setPagesData({ ...pagesData, current: pageNumber });
  };

  const resetSite = () => {
    window.location.href = "/";
  };

  const queryToUsableQuery = () => {
    const queryOptions = ["page", "model", "os", "brand", "sort"];
    const queryArray = [];
    queryOptions.forEach((option) => {
      const queryValue =
        query.get(option) && revertStringReplacement(query.get(option));
      if (queryValue) {
        queryArray.push(`${option}=${replaceNonAlphanumeric(queryValue)}`);
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
  const deletePhone = async (phoneID) => {
    const toastID = toast.loading("deleting Phone");
    setIsLoading(true);
    try {
      await axios.delete(`${baseUrl}phones/${[phoneID]}`);
      toast.success("Phone Deleted", { id: toastID });
    } catch (error) {
      toast.error(error.message, { id: toastID });
    } finally {
      setIsLoading(false);
      getPhones();
    }
  };
  const confirmPhoneDelete = (phoneID, toastID) => {
    toast.dismiss(toastID);
    deletePhone(phoneID);
  };

  const closePopover = () => {
    setPopoverElement(null);
    getPhones();
  };

  useEffect(() => {
    if (pagesData) {
      const lastPage = query.get("page");
      query.set("page", pagesData.current);
      //load if the page changes
      if (lastPage !== pagesData.current && lastPage != "") {
        getPhones();
      }
    }
  }, [pagesData, query]);

  useEffect(() => {
    if (!isLoading) {
      query.set("sort", query.get("sort") || "0");
      setSortObj(getSortObj(Number(query.get("sort"))));
      getPhones();
    }
  }, []);
  useEffect(() => {
    if (sortObj) {
      const sortNumber = extractSortNumber(sortObj);
      const lastSort = query.get("sort");
      query.set("sort", sortNumber);
      if (lastSort != sortNumber) getPhones();
    }
  }, [sortObj]);

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
      sortable: true,
      sortKey: "releaseYear",
    },
    {
      header: "Price",
      cellContent: <p />,
      width: "8%",
      textAlign: "center",
      propsMapping: (data) => ({
        children: `${data.price}$`,
      }),
      sortable: true,
      sortKey: "price",
    },
    {
      header: "OS",
      cellContent: "os",
      width: "8%",
      textAlign: "center",
    },
    {
      header: "Edit",
      cellContent: <EditDeleteBtn />,
      width: "15%",
      propsMapping: (data) => {
        return {
          editOnClick: () => {
            setPopoverElement(
              <PhoneEditor phoneID={data._id} closePopover={closePopover} />
            );
          },
          deleteOnClick: () => {
            toast.dismiss(confirmToastId);
            const toastID = toast.custom(
              (t) => (
                <ConfirmBox
                  message={`Do you want to delete ${data.model} ?`}
                  cancelText="Delete"
                  confirmText="Cancel"
                  onCancel={() => {
                    confirmPhoneDelete(data._id, t.id);
                  }}
                  onConfirm={() => toast.dismiss(t.id)}
                />
              ),
              { position: "top-center" }
            );
            setConfirmToastId(toastID);
          },
        };
      },
    },
  ];

  return (
    <div className={styles["home-page"]}>
      <div className={styles["top-bar"]}>
        <div className={styles["top-bar-btn"]}>
          <Button
            text="Add Phone"
            icon={<Icon name="AddIcon" color="var(--light-text-color)" />}
            onClick={() => {
              setPopoverElement(<PhoneEditor closePopover={closePopover} />);
            }}
            fullWidth
            maxContent
          />
        </div>
        <SearchBar sendSearch={getPhones} query={query} />
      </div>
      {isLoading ? (
        <div className={styles["spinner-container"]}>
          <Spinner />
        </div>
      ) : (
        <div className={styles["table-container"]}>
          <Table
            columns={columns}
            data={phonesArray}
            reset={resetSite}
            sort={sortObj}
            setSort={setSortObj}
          />
          {pagesData && (
            <Pagination
              currentPage={Number(pagesData.current)}
              totalPages={Number(pagesData.total)}
              changePage={changePageNumber}
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
