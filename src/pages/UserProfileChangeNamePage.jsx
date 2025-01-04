import React from "react";
import Container from "../components/Container";
import reactUseCookie from "react-use-cookie";
import { HiLockOpen } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useUserStore from "../stores/useUserStore";

const UserProfileChangeNamePage = () => {
  const [userCookie, setUserCookie] = reactUseCookie("user");
  // const { name, email, profile_image } = JSON.parse(userCookie);
  const {user:{name,email,profile_image},setUser} = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm(); 
  const [token] = reactUseCookie("my_token");

  const handleUpdateName = async (data) => {
    // console.log(data);
    const res = await fetch(import.meta.env.VITE_API_URL + "/user-profile/change-name", {
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
      setUser(result.user);
    } else {
      toast.error(result.message);
    }
    reset();
  }
  return (
    <section>
      <Container>
        <Breadcrumb
          currentPageTitle={"Change Name"}
          links={[{ title: "User Profile", path: "/dashboard/user-profile" }]}
        />
        <form onSubmit={handleSubmit(handleUpdateName)} className="flex items-end border  p-10 gap-5 space-y-5 px-10 mt-5">
          <div className="">
            <label
              htmlFor="first_name"
              className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
                errors.name ? "text-red-500" : ""
              }`}
            >
              Update Your Name
            </label>
            <input
              type="text"
              {...register("name", {
                required: true,
                minLength: 3,
                maxLength: 20,
              })}
              className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
            block w-full p-2.5 ${
              errors.name
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : ""
            }`}
              placeholder="eg.apple"
              required
            />
            {errors.name?.type === "required" && (
              <p role="alert" className="text-red-500 text-sm ">
                Product name is required
              </p>
            )}
            {errors.name?.type === "minLength" && (
              <p role="alert" className="text-red-500 text-sm ">
                Product name must be at least 3 characters
              </p>
            )}
            {errors.name?.type === "maxLength" && (
              <p role="alert" className="text-red-500 text-sm ">
                Product name must be less than 20 characters
              </p>
            )}
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

export default UserProfileChangeNamePage;
