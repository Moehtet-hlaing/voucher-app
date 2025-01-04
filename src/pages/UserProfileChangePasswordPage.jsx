import React from "react";
import Container from "../components/Container";
import reactUseCookie from "react-use-cookie";
import { HiLockOpen } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useUserStore from "../stores/useUserStore";

const UserProfileChangePasswordPage = () => {
  const [userCookie, setUserCookie] = reactUseCookie("user");
  // const { name, email, profile_image } = JSON.parse(userCookie);
  // const {user:{name,email,profile_image},setUser} = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm(); 
  const [token, setToken] = reactUseCookie("my_token");
  const navigate = useNavigate();

  const handleUpdatePassword = async (data) => {
    console.log(data);
    const res = await fetch(import.meta.env.VITE_API_URL + "/user-profile/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.status === 200) {
      toast.success(result.message);
      setUserCookie(JSON.stringify(result.user));
      setToken("");
      navigate("/");
    } else {
      toast.error(result.message);
    }
    reset();
  }
  return (
    <section>
      <Container>
        <Breadcrumb
          currentPageTitle={"Change Password"}
          links={[{ title: "User Profile", path: "/dashboard/user-profile" }]}
        />
        <form onSubmit={handleSubmit(handleUpdatePassword)} className="flex items-end border  p-10 gap-5 space-y-5 px-10 mt-5">
          <div className="flex flex-col gap-3">
          <div className="">
            <label
              htmlFor="first_name"
              className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
                errors.old_password ? "text-red-500" : ""
              }`}
            >
              Your Password
            </label>
            <input
              type="text"
              {...register("old_password", {
                required: true,
                minLength: 3,
                maxLength: 20,
              })}
              className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
            block w-full p-2.5 ${
              errors.old_password
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : ""
            }`}
              placeholder="eg.apple"
              required
            />
            {errors.old_password?.type === "required" && (
              <p role="alert" className="text-red-500 text-sm ">
                Product name is required
              </p>
            )}
            {errors.old_password?.type === "minLength" && (
              <p role="alert" className="text-red-500 text-sm ">
                Product name must be at least 3 characters
              </p>
            )}
            {errors.old_password?.type === "maxLength" && (
              <p role="alert" className="text-red-500 text-sm ">
                Product name must be less than 20 characters
              </p>
            )}
          </div>
          <div className="">
            <label
              htmlFor="first_name"
              className={`block mb-1 text-sm font-medium text-gray-900 dark:text-white ${
                errors.new_password ? "text-red-500" : ""
              }`}
            >
              New Password
            </label>
            <input
              type="text"
              {...register("new_password", {
                required: true,
                minLength: 3,
                maxLength: 20,
              })}
              className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
            block w-full p-2.5 ${
              errors.new_password
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : ""
            }`}
              placeholder="eg.apple"
              required
            />
            {errors.new_password?.type === "required" && (
              <p role="alert" className="text-red-500 text-sm ">
                Product name is required
              </p>
            )}
            {errors.new_password?.type === "minLength" && (
              <p role="alert" className="text-red-500 text-sm ">
                Product name must be at least 3 characters
              </p>
            )}
            {errors.new_password?.type === "maxLength" && (
              <p role="alert" className="text-red-500 text-sm ">
                Product name must be less than 20 characters
              </p>
            )}
          </div>
          <div className="">
            <label
              htmlFor="first_name"
              className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
                errors.new_password_confirmation ? "text-red-500" : ""
              }`}
            >
              Confirm Your New Password
            </label>
            <input
              type="text"
              {...register("new_password_confirmation", {
                required: true,
                minLength: 3,
                maxLength: 20,
              })}
              className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
            block w-full p-2.5 ${
              errors.new_password_confirmation
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : ""
            }`}
              placeholder="eg.apple"
              required
            />
            {errors.new_password_confirmation?.type === "required" && (
              <p role="alert" className="text-red-500 text-sm ">
                Product name is required
              </p>
            )}
            {errors.new_password_confirmation?.type === "minLength" && (
              <p role="alert" className="text-red-500 text-sm ">
                Product name must be at least 3 characters
              </p>
            )}
            {errors.new_password_confirmation?.type === "maxLength" && (
              <p role="alert" className="text-red-500 text-sm ">
                Product name must be less than 20 characters
              </p>
            )}
          </div>
          </div>
          <button
            type="submit"

            className="inline-flex gap-3 items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto"
          >
            Update
          </button>
        </form>
      </Container>
    </section>
  );
};

export default UserProfileChangePasswordPage;
