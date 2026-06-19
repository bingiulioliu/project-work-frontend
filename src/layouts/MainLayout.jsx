import { Outlet } from "react-router";
import Header from "../components/Header/header";
import Footer from "../components/Footer/Footer";
import "../styles/index.css";
function MainLayout() {
    return (

        <div className="main-background">
            <div>
                <Header />

                <main className="main-content my-4">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default MainLayout;