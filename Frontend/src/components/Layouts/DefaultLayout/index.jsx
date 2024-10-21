import { Outlet } from "react-router-dom";
import { createContext,useContext} from "react";
import Header from "./Header";
import { TokenContext } from "../../../App";


export const UserContext = createContext();

function DefaultLayout() {
    const {user} = useContext(TokenContext)

    return (
        <div>
            {user && <Header />}
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
}

export default DefaultLayout;
