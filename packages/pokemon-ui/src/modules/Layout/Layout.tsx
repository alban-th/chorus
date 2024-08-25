import { Outlet } from "react-router-dom";
import { Profiles } from "../Profiles";

export function Layout() {
  return (
    <>
      <Profiles />
      <Outlet />
    </>
  );
}
