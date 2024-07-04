import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { baseUrl } from "../../../utils/utils";
import Popover from "../../atoms/Popover/Popover";
// import Pagination from "../../molecules/Pagination/Pagination";
import useQuery from "../../../hooks/useQuery";
import Table from "../../molecules/Table/Table";

function Home() {
  const [phonesArray, setPhonesArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const query = useQuery();

  //add query later
  useEffect(() => {
    const getPhones = async () => {
      const toastID = toast.loading("Loading Phones");
      setIsLoading(true);
      try {
        const res = await axios.get(`${baseUrl}phones?/`);
        setPhonesArray(res.data);
        toast.success("Phones Loaded", { id: toastID });
      } catch (error) {
        toast.error(error.message, { id: toastID });
      } finally {
        setIsLoading(false);
      }
    };
    if (!isLoading) {
      getPhones();
    }
  }, []);

  const columns = [
    {
      header: "Model",
      cellContent: "model",
      width: "10%",
      verticalAlign: "middle",
    },
  ];

  return (
    <div>
      <Table columns={columns} data={phonesArray} />
      {/* <Pagination /> */}

      <Popover></Popover>
    </div>
  );
}

export default Home;
