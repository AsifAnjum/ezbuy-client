import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/features/wishlist/wishlist";
import { toast, Bounce, Zoom } from "react-toastify";

const useWishlist = () => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);

  const handleToggleWishlist = (productId, isWishlist) => {
    const unauthorizedUserRole = ["admin", "moderator"];
    if (unauthorizedUserRole.includes(user?.role)) {
      toast.error("You are not authorized to add wishlist", {
        pauseOnFocusLoss: false,
        position: "top-center",
        delay: 200,
        autoClose: 2000,
        transition: Zoom,
      });
    } else if (isWishlist) {
      dispatch(removeFromWishlist(productId));
    } else if (!isWishlist && wishlist.length < 5) {
      dispatch(addToWishlist(productId));
    } else {
      toast.error("You can add only 5 products in wishlist at a time", {
        pauseOnFocusLoss: false,
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
    }
  };

  return { wishlist, handleToggleWishlist };
};
export default useWishlist;
