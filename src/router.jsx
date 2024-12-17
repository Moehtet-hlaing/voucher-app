import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardPage from "./pages/DashboardPage";
import ProductPage from "./pages/ProductPage";
import SalePage from "./pages/SalePage";
import VoucherPage from "./pages/VoucherPage";
import CreateProductPage from "./pages/CreateProductPage";
import EditProductPage from "./pages/EditProductPage";

const router = createBrowserRouter([
     {
        path: "/",
        element : <Layout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
            {
                path: "/product",
                element:<ProductPage />
            },
            {
                path: "/sale",
                element:<SalePage />
            },
            {
                path: "/voucher",
                element:<VoucherPage />
            },
            {
                path: "/product/create",
                element:<CreateProductPage />
            },
            {
                path: "/product/edit/:id",
                element:<EditProductPage />
            }
        ]
     },
]);

export default router;