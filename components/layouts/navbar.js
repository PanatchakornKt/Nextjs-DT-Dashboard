import React from "react";
import NavLink from "./NavLink";

const NavBar = () => {
  return (
    <>
      <div className="my-5">
        <NavLink href="/">Widgets</NavLink>
        <NavLink href="/about">About</NavLink>
      </div>
    </>
  );
};
export default NavBar;
