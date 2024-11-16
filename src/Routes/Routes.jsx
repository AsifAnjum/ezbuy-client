import { createBrowserRouter } from "react-router-dom";

import Main from "../layout/Main";
import PageTitle from "../pages/shared/PageTitle";
import Home from "../pages/Home/Home/Home";
import ProductDetails from "../pages/ProductDetails/ProductDetails";

import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import Wishlist from "../pages/Wishlist/Wishlist";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import Dashboard from "../layout/Dashboard";
import Profile from "../pages/Dashboard/Profile/Profile";
import AddProduct from "../pages/Dashboard/AddProduct/AddProduct";
import PrivateRoute from "./PrivateRoute";
import ManageProducts from "../pages/Dashboard/ManageProducts/ManageProducts";
import EditProduct from "../pages/Dashboard/EditProduct/EditProduct";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import UserProfile from "../pages/Dashboard/UserProfile/UserProfile";
import Shop from "../pages/Shop/Shop";
import Contact from "../pages/Contact/Contact";

import PageNotFound from "../component/ui/error/PageNotFound";
import ErrorBoundary from "../component/ui/error/ErrorBoundary";
import Support from "../pages/Dashboard/Support/Support";
import SupportMessage from "../pages/Dashboard/SupportMessage/SupportMessage";
import AddCoupon from "../pages/Dashboard/AddCoupon/AddCoupon";
import ManageCoupons from "../pages/Dashboard/ManageCoupons/ManageCoupons";
import Coupon from "../pages/Dashboard/Coupon/Coupon";
import Payment from "../pages/Payment/Payment";
import Order from "../pages/Dashboard/Order/Order";
import StaffRoute from "./StaffRoute";
import ManageOrders from "../pages/Dashboard/ManageOrders/ManagerOrders";
import OrderDetails from "../pages/Dashboard/OrderDetails/OrderDetails";
import DashboardHome from "../pages/Dashboard/Home/DashboardHome";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import NewPassword from "../pages/NewPassword/NewPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: (
          <>
            <PageTitle title="EZ Buy | Home" />
            <Home />
          </>
        ),
      },
      {
        path: "/shop",
        element: (
          <>
            <PageTitle title="EZ Buy | Shop" />
            <Shop />
          </>
        ),
      },
      {
        path: "/signup",
        element: (
          <>
            <PageTitle title="EZ Buy | Signup" />
            <Signup />
          </>
        ),
      },
      {
        path: "/login",
        element: (
          <>
            <PageTitle title="EZ Buy | Login" />
            <Login />
          </>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <>
            <PageTitle title="EZ Buy | Wishlist" />
            <Wishlist />
          </>
        ),
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <PageTitle title="EZ Buy | Cart" />
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <PageTitle title="EZ Buy | Checkout" />
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <PageTitle title="EZ Buy | Payment" />
            <Payment />
          </PrivateRoute>
        ),
      },

      {
        path: "/product/:slug",
        element: (
          <>
            <PageTitle title="EZ Buy | Product" />
            <ProductDetails />
          </>
        ),
      },
      {
        path: "/contact",
        element: (
          <>
            <PageTitle title="EZ Buy | About" />

            <Contact />
          </>
        ),
      },
      {
        path: "reset-password",
        element: (
          <>
            <PageTitle title="EZ Buy | Reset Password" />
            <ResetPassword />
          </>
        ),
      },
      {
        path: "new-password/:token",
        element: (
          <>
            <PageTitle title="EZ Buy | New Password" />
            <NewPassword />
          </>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <PageTitle title="EZ Buy | Dashboard" />
        <Dashboard />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,

    children: [
      {
        // path: "/",
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "my-order",
        element: <Order />,
      },
      {
        path: "add-product",
        element: (
          <StaffRoute>
            <AddProduct />
          </StaffRoute>
        ),
      },
      {
        path: "edit-product/:id",
        element: (
          <StaffRoute>
            <EditProduct />
          </StaffRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <StaffRoute>
            <ManageProducts />
          </StaffRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <StaffRoute>
            <ManageUsers />
          </StaffRoute>
        ),
      },
      {
        path: "user/:id",
        element: (
          <StaffRoute>
            <UserProfile />
          </StaffRoute>
        ),
      },
      {
        path: "support-messages",
        element: (
          <StaffRoute>
            <Support />
          </StaffRoute>
        ),
      },
      {
        path: "support-message/:id",
        element: (
          <StaffRoute>
            <SupportMessage />
          </StaffRoute>
        ),
      },
      {
        path: "add-coupon",
        element: (
          <StaffRoute>
            <AddCoupon />
          </StaffRoute>
        ),
      },
      {
        path: "manage-coupons",
        element: (
          <StaffRoute>
            <ManageCoupons />
          </StaffRoute>
        ),
      },
      {
        path: "coupon/:code",
        element: (
          <StaffRoute>
            <Coupon />
          </StaffRoute>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <StaffRoute>
            <ManageOrders />
          </StaffRoute>
        ),
      },
      {
        path: "order/:id",
        element: (
          <StaffRoute>
            <OrderDetails />
          </StaffRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
