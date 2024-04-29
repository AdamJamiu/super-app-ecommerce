import { useNavigate } from "react-router-dom";
import DashboardLayout from "../global/DashboardLayout";
// material icons
// assets
import OrderSumary from "../components/Cart/OrderSummary";
import CartItems from "../components/Cart/CartItems";
import { useEffect } from "react";
import { getUserCart } from "../controllers/dashboard";
import CartSkeleton from "./CartSkeleton";

const Cart = () => {
  const navigate = useNavigate();
  const { data = [], isLoading } = getUserCart({ navigate });

  useEffect(() => {
    document.title = `Cart | ${data?.cartProducts?.length} items - JOI Web`;
  }, [data?.cartProducts?.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <DashboardLayout>
      <ProtectRoute>
        {isLoading ? (
          <CartSkeleton />
        ) : (
          <div className="relative flex flex-row my-1 md:my-10 flex-wrap gap-y-10 md:flex-nowrap w-full justify-start gap-7 items-stretch h-full">
            <CartItems data={data} isLoading={isLoading} />
            {data?.cartProducts?.length < 1 ? null : (
              <OrderSumary data={data} />
            )}
          </div>
        )}
      </ProtectRoute>
    </DashboardLayout>
  );
};

export default Cart;
