import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardPage from "./pages/DashboardPage";
import ProductPage from "./pages/ProductPage";
import SalePage from "./pages/SalePage";
import VoucherPage from "./pages/VoucherPage";
import CreateProductPage from "./pages/CreateProductPage";
import EditProductPage from "./pages/EditProductPage";
import VoucherDetailPage from "./pages/VoucherDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserProfileChangeNamePage from "./pages/UserProfileChangeNamePage";
import UserProfileChangeEmailPage from "./pages/UserProfileChangeEmailPage";
import UserProfileChangePasswordPage from "./pages/UserProfileChangePasswordPage";
import UserProfileChangeProfileImagePage from "./pages/UserProfileChangeProfileImagePage";

const router = createBrowserRouter([
     {
        path: "/",
        errorElement: <NotFoundPage />,
        children: [
            {index: true, element: <LoginPage />},
            {path: "/register", element: <RegisterPage />},
            {
                path: "/dashboard",
                element: <Layout />,
                children: [
                    {
                        index: true,
                        element: <DashboardPage />,
                    },
                    {
                        path: "product",
                        element:<ProductPage />
                    },
                    {
                        path: "sale",
                        element:<SalePage />
                    },
                    {
                        path: "voucher",
                        element:<VoucherPage />
                    },
                    {
                        path: "product/create",
                        element:<CreateProductPage />
                    },
                    {
                        path: "product/edit/:id",
                        element:<EditProductPage />
                    },
                    {
                        path: "voucher/details/:id",
                        element:<VoucherDetailPage/>
                    },
                    {
                        path:"user-profile",
                        children: [
                            {
                                index: true,
                                element: <UserProfilePage />
                            },
                            {
                                path: "change-name",
                                element: <UserProfileChangeNamePage />
                            },
                            {
                                path: "change-password",
                                element: <UserProfileChangePasswordPage />
                            },
                            {
                                path: "change-email",
                                element: <UserProfileChangeEmailPage />
                            },
                            {
                                path: "change-profile-image",
                                element: <UserProfileChangeProfileImagePage />
                            },                           
                        ]
        
                    }
                ]
            }
        ],
        
     },
]);

export default router;