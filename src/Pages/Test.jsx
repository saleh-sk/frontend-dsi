import React from "react";
import Logout from "../Components/Logout";

const Test = () => {


  const authUserString = sessionStorage.getItem("authUser");
  const authUser = JSON.parse(authUserString);
  return (
  <>

  {authUser.token}

  <Logout/>
  </>
)};
export default Test;
