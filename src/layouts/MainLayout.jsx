import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/index.css";

function MainLayout() {
    return (
        <div className="main-background">
            
                <Header />

                <Outlet />


                <Footer />
            
        </div>
    );
}

export default MainLayout;