import React from "react";
import Container from "./Container";
import reactUseCookie from "react-use-cookie";
import useUserStore from "../stores/useUserStore";

const Header = () => {
  // const [userCookie] = reactUseCookie("user");
  // const {name,email,profile_image} = JSON.parse(userCookie);
  const {user:{name,email,profile_image}} = useUserStore();
  return (
    <header className=" mb-5">
      <Container className={``}>
        <div className=" flex justify-between items-center">
          <div>
            <h1 className=" font-bold text-3xl">Voucher App</h1>
            <p className=" text-slate-700">MMS Software</p>
          </div>
          <div className=" flex items-center gap-2">
            <img className=" size-10 rounded-full object-cover object-top" src={
                profile_image
                  ? profile_image
                  : "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
              } alt="user photo" />
            <div>
              <h1 className=" font-bold text-lg">{name}</h1>
              <p className=" text-slate-700 text-xs">{email}</p>
            </div>
          </div>
        </div>
      </Container>
      
    </header>
  );
};

export default Header;
