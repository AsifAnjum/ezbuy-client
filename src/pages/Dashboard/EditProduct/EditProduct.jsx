import { useGetProductQuery } from "../../../redux/features/product/productApi";
import { useParams } from "react-router-dom";

import ItemNotFound from "../../../component/ui/error/ItemNotFound";
import EditForm from "./EditForm";

const EditProduct = () => {
  // const [showData, setShowData] = useState(true);
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetProductQuery(id);

  const product = data?.data || {};

  let content;
  if (isLoading) {
    content = <div className="skeleton"></div>;
  } else if (isError) {
    if (error.status === 404) {
      content = <ItemNotFound message="Oops No Product Found With this Id" />;
    } else {
      content = <ItemNotFound message="Something Went Wrong!!!" />;
    }
  } else if (!Object.keys(product).length) {
    content = <ItemNotFound message="Something Went Wrong!!!" />;
  } else if (Object.keys(product).length) {
    content = <EditForm product={product} />;
  }
  return (
    <div>
      <div className="min-h-screen p-10 rounded-lg shadow-xl shadow-slate-700">
        <div className="font-bold divider">Product Info</div>

        {content}
      </div>
    </div>
  );
};
export default EditProduct;
