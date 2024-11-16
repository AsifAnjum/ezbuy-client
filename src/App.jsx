import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import ErrorModal from "./modal/ErrorModal";
import { Slide, ToastContainer } from "react-toastify";
import useAuthCheck from "./hooks/useAuthCheck";
import PageLoader from "./component/ui/PageLoader";

function App() {
  const authChecked = useAuthCheck();

  if (!authChecked) {
    return <PageLoader />;
  }

  return (
    <div className="overflow-x-hidden">
      <RouterProvider router={router} />
      <ErrorModal />
      <ToastContainer
        limit={1}
        autoClose={1500}
        hideProgressBar={true}
        transition={Slide}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
