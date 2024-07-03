import { Toaster } from "react-hot-toast";

function AppToaster() {
  const toasterOptions = {
    className: "toast-popup",
    duration: 5000,
    style: {
      background: "var(--light-background-color)",
      color: "var(--text-color)",
      minWidth: "250px",
    },
    loading: {
      duration: 60000,
    },
  };

  return (
    <Toaster
      position={"bottom-left"}
      containerClassName="toaster-container"
      containerStyle={{ fontSize: "large" }}
      toastOptions={toasterOptions}
    />
  );
}

export default AppToaster;
