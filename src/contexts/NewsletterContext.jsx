import { createContext, useState } from "react";

const NewsletterContext = createContext(null);

function NewsletterProvider({ children }) {
    const [isVisible, setIsVisible] = useState(() => {
        return localStorage.getItem("jsonQuestNewsletterSeen") !== "true";
    });

    function hideNewsletter() {
        setIsVisible(false);
        localStorage.setItem("jsonQuestNewsletterSeen", "true");
    }

    function showNewsletter() {
        setIsVisible(true);
        localStorage.removeItem("jsonQuestNewsletterSeen");
    }

    const value = {
        isVisible,
        hideNewsletter,
        showNewsletter
    };

    return (
        <NewsletterContext.Provider value={value}>
            {children}
        </NewsletterContext.Provider>
    );
}

export { NewsletterContext, NewsletterProvider };