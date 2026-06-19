<<<<<<< HEAD
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
=======
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MainLayout() {
    return (
        <>
            <Header />
            
                <Outlet />
            
>>>>>>> be91735758bbf6aab511221b5cb49fa0e8075293
            <Footer />
        </div>
    );
}

export default MainLayout;