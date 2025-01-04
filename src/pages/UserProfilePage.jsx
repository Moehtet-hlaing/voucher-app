import React from "react";
import Container from "../components/Container";
import reactUseCookie from "react-use-cookie";
import { HiLockOpen } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import useUserStore from "../stores/useUserStore";

const UserProfilePage = () => {
  // const [userCookie] = reactUseCookie("user");
  // const { name, email, profile_image } = JSON.parse(userCookie);
   const {user:{name,email,profile_image}} = useUserStore();
  return (
    <section>
      <Container>
        <Breadcrumb currentPageTitle={"User Profile"} />
        <div className="space-y-5 px-10 mt-5">
          <div className="flex space-x-4 items-end">
            <div className="relative">
              <img
                className="size-32 rounded-lg object-cover object-center"
                src= {profile_image ? profile_image : "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"}
                alt="user photo"
              />
              <Link
              to = {`/dashboard/user-profile/change-profile-image` }
                type="button"
                className="absolute right-0 bottom-0 translate-x-1/2 -translate-y-1/2 inline-flex  items-center justify-center rounded-lg bg-blue-700 px-1 py-1 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto"
              >
                <svg
                  className=" h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  //   size={10}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                  />
                </svg>
              </Link>
            </div>
            <div className="flex flex-col justify-end">
              <span className="mb-2 inline-block rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                Account
              </span>
              <div className=" relative">
              <h2 className="flex items-center text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">
                {name}
              </h2>
              <Link
               to="/dashboard/user-profile/change-name"
                type="button"
                className="absolute right-0 bottom-0  translate-x-6 inline-flex  items-center justify-center rounded-lg bg-blue-700 px-1 py-1 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto"
              >
                <svg
                  className=" h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  //   size={10}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                  />
                </svg>
              </Link>
              </div>
            </div>
          </div>

          <div>
            <div className=" relative inline-block font-semibold text-gray-900 dark:text-white">
              <p>Email Address</p>
              <button
                type="button"
                className="absolute right-0 bottom-0  translate-x-8 inline-flex  items-center justify-center rounded-lg bg-blue-700 px-1 py-1 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto"
              >
                <svg
                  className=" h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  //   size={10}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                  />
                </svg>
              </button>
            </div>

            <dd className="text-gray-500 dark:text-gray-400">{email}</dd>
          </div>
          <Link to="/dashboard/user-profile/change-password" type="button" className="inline-flex gap-3 items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto">
  <HiLockOpen />
  Change Password
</Link>

        </div>
      </Container>
    </section>
  );
};

export default UserProfilePage;
