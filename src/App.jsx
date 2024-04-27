import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages
import Login from "./views/Login";
import Signup from "./views/Signup";
import Cart from "./views/Cart";
import ForgotPassword from "./views/ForgotPassword";
import ProductDetails from "./views/ProductDetails";
import Dashboard from "./views/Dashboard";

// Lazy load
const Profile = lazy(() => import("./pages/dashboard/Profile"));
// const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'));
const Orders = lazy(() => import("./pages/dashboard/Orders"));
// const Home = lazy(() => import('./views/Home'));
const LandingPage = lazy(() => import("./views/LandingPage"));
const Products = lazy(() => import("./views/Products"));
const DataPrivacy = lazy(() => import("./views/DataPrivacy"));

import EnterOtp from "./views/EnterOtp.";
import AppLoading from "./components/AppLoading";
import DefaultHome from "./components/products/DefaultHome";
import BrandCatgories from "./components/products/BrandCategories";
import NotFound from "./components/404/404";
import ScrollToTop from "./components/ScrollToTop";
import OrderDetails from "./components/Cart/OrderDetails";
import Dashboard404 from "./components/404/Dashboard404";
import SearchPage from "./components/products/SearchPage";
import Promotions from "./components/promos/Promotions";
import TermsNCondidtions from "./views/TermsNCondidtions";
import ReturnPolicy from "./views/ReturnPolicy";
import "./App.css";
import OurStory from "./views/OurStory";
import ChangePassWordPage from "./pages/dashboard/ChangePassword";
import AppDashboardPage from "./views/AppDashboard";
import SignIn from "./views/SignIn";
import ResetPassword from "./views/ResetPassword";

function App() {
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenDrawer = () => setOpenDrawer(true);
  const handleCloseDrawer = () => setOpenDrawer(false);

  return (
    <Router>
      <Suspense fallback={<AppLoading />}>
        <ScrollToTop />
        <Routes>
          {/* <Route exact path="/" element={<LandingPage />} /> */}
          <Route exact path="/" element={<AppDashboardPage />} />
          <Route exact path="/deals" element={<Promotions />} />
          {/* <Route exact path="/auth/login" element={<Login />} /> */}
          <Route exact path="/login" element={<SignIn />} />
          <Route exact path="/onboard" element={<Signup />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:token/:email"
            element={<ResetPassword />}
          />
          {/* <Route path='/auth/resetPassword' element={<ForgotPassword />} /> */}
          {/* <Route exact path="/data-privacy" element={<DataPrivacy />} /> */}
          {/* <Route exact path="/terms&conditions" element={<TermsNCondidtions />} /> */}
          {/* <Route exact path="/our-story" element={<OurStory />} /> */}
          {/* <Route path="return-policy" element={<ReturnPolicy />} /> */}
          {/* <Route path='/auth/confirmEmail' element={<EnterOtp />} /> */}
          {/* <Route path="/products" element={<Products handleOpen={handleOpen} open={open} onClose={handleClose} />}>
            <Route path="" element={<DefaultHome handleOpen={handleOpen} />} />
            <Route path="search/:searchString" element={<SearchPage handleOpen={handleOpen} />} />
            <Route path="brand/:brandId" element={<BrandCatgories handleOpen={handleOpen} />} />
          </Route> */}
          {/* <Route path="/products/:id" element={<ProductDetails />} /> */}
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/customer/account"
            element={
              <Dashboard onClose={handleCloseDrawer} open={openDrawer} />
            }
          >
            {/* <Route index path="home" element={<DashboardPage />} /> */}
            <Route
              index
              path="profile"
              element={<Profile onOpen={handleOpenDrawer} />}
            />
            <Route
              index
              path="change-password"
              element={<ChangePassWordPage onOpen={handleOpenDrawer} />}
            />
            <Route
              path="orders"
              element={<Orders onOpen={handleOpenDrawer} />}
            />
            <Route
              path="orders/detail/:orderId"
              element={<OrderDetails onOpen={handleOpenDrawer} />}
            />
            <Route path="*" element={<Dashboard404 />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
