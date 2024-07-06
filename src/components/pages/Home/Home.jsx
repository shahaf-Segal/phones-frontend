import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { baseUrl } from "../../../utils/utils";
import Popover from "../../atoms/Popover/Popover";
// import Pagination from "../../molecules/Pagination/Pagination";
import useQuery from "../../../hooks/useQuery";
import Button from "../../atoms/Button/Button";
import Icon from "../../atoms/Icon/Icon";
import Table from "../../molecules/Table/Table";
import PhoneEditor from "../../PhoneEditor/PhoneEditor";

function Home() {
  const [phonesArray, setPhonesArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [popoverElement, setPopoverElement] = useState();
  const query = useQuery();

  const getPhones = async () => {
    const toastID = toast.loading("Loading Phones");
    setIsLoading(true);
    try {
      const res = await axios.get(`${baseUrl}phones?/`);
      setPhonesArray(res.data);
      toast.dismiss(toastID);
    } catch (error) {
      toast.error(error.message, { id: toastID });
    } finally {
      setIsLoading(false);
    }
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
            setPopoverElement(<PhoneEditor phoneID={data._id} />);
          },
        };
      },
    },
  ];

  return (
    <div>
      {isLoading || <Table columns={columns} data={phonesArray} />}
      {/* <Pagination /> */}

      <Popover
        isPopoverOpen={Boolean(popoverElement)}
        onClose={() => {
          setPopoverElement(null);
          getPhones();
        }}
      >
        {popoverElement}
      </Popover>
    </div>
  );
}

export default Home;
