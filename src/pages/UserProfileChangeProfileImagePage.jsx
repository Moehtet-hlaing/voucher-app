import React, { useRef } from "react";
import Container from "../components/Container";
import reactUseCookie from "react-use-cookie";
import { HiLockOpen, HiMiniCamera } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useUserStore from "../stores/useUserStore";

const UserProfileChangeProfileImagePage = () => {
  const [userCookie, setUserCookie] = reactUseCookie("user");
  // const { name, email, profile_image } = JSON.parse(userCookie);
  const {
    user: { name, email, profile_image },
    setUser,
  } = useUserStore();
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm();
  const [token] = reactUseCookie("my_token");
  const fileInput = useRef();
 
  const handleUpdateImage = async (event) => {
    // console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append("profile_image", event.target.files[0]);
   
   
    const res = await fetch(
      import.meta.env.VITE_API_URL + "/user-profile/change-profile-image",
      {
        method: "POST",
        body: formData,
        headers: {
          // "Content-Type": "application/json",
          // "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await res.json();
    if (res.status === 200) {
      toast.success(result.message);
      setUserCookie(JSON.stringify(result.user));
      setUser(result.user);
    } else {
      toast.error(result.message);
    }
   
    
  };
  const handleImageUploader = () => {
   
      fileInput.current?.click();
    
  };
  return (
    <section>
      <Container>
        <Breadcrumb
          currentPageTitle={"Change Profile Image"}
          links={[{ title: "User Profile", path: "/dashboard/user-profile" }]}
        />
        <form
          // onSubmit={handleSubmit(handleUpdateImage)}
          className="flex items-end border  p-10 gap-5 space-y-5 px-10 mt-5"
        >
          <div className="">
            <div className="relative">
              <img
                className="size-32 rounded-lg object-cover object-center mb-5"
                src={
                  profile_image
                    ? profile_image
                    : "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
                }
                alt="user photo"
              />

              <button
                type="button"
                onClick={handleImageUploader}
                className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/4 inline-flex  items-center justify-center rounded-lg bg-blue-700 px-1 py-1 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto"
              >
                <HiMiniCamera className="pointer-events-none" />
              </button>
            </div>
            <input
              // {...register("profile_image", {
              //   required: true,
              // })}
              ref = {fileInput}
              onChange={handleUpdateImage}
              className="hidden  w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 "
              id="profile_image"
              type="file"
            />

            {/* {errors.profile_image?.type === "required" && (
              <p role="alert" className="text-red-500 text-sm ">
                Profile image is required
              </p>
            )} */}

            {/* <button
              type="submit"
              className="inline-flex gap-3 items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto"
            >
              Update
            </button> */}
          </div>
        </form>
      </Container>
    </section>
  );
};

export default UserProfileChangeProfileImagePage;
