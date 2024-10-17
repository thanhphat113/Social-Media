import { Outlet } from "react-router-dom";
import { createContext} from "react";
import Header from "./Header";


export const UserContext = createContext();

function DefaultLayout() {
    return (
        <>
            <Header />
            <div className="container">
                <Outlet />
            </div>
        </>
    );
}

export default DefaultLayout;
