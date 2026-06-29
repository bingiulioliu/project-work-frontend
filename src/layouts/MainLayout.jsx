import { useEffect, useRef, useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/index.css";
import NewsletterBanner from "../components/NewsletterBanner";
import ChatbotWidget from "../components/ChatbotWidget";

function MainLayout() {
    const outlet = useOutlet();
    const location = useLocation();
    const timeoutRef = useRef(null);
    const [displayedOutlet, setDisplayedOutlet] = useState(outlet);
    const [displayedPathname, setDisplayedPathname] = useState(location.pathname);
    const [transitionStage, setTransitionStage] = useState("route-enter");

    useEffect(() => {
        if (location.pathname === displayedPathname) {
            setDisplayedOutlet(outlet);
            return;
        }

        setTransitionStage("route-exit");

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setDisplayedOutlet(outlet);
            setDisplayedPathname(location.pathname);
            setTransitionStage("route-enter");
            timeoutRef.current = null;
        }, 500);
    }, [location.pathname, outlet, displayedPathname]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return <>
        <Header />

        <main className={`route-transition-container ${transitionStage}`}>
            {displayedOutlet}
        </main>

        <Footer />

        <NewsletterBanner />

        <ChatbotWidget />
    </>;
}

export default MainLayout;