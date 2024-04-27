import DashboardLayout from "../../global/DashboardLayout";
import BrandsDrawer from "../products/BrandsDrawer";
import PromoSection from "./PromoSection";

const Promotions = ({ open, onClose }) => {
    return (
        <DashboardLayout>
            <PromoSection />
            <BrandsDrawer open={open} onClose={onClose} />
        </DashboardLayout>
    )
}

export default Promotions;