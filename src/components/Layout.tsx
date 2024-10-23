import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Layout() {

console.log("Layout render");

    return (
        <>
            <Header/>
            <Outlet/>
        </>
    );
}