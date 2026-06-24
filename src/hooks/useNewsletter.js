import { useContext } from "react";
import { NewsletterContext } from "../contexts/NewsletterContext";

export function useNewsletter() {
    return useContext(NewsletterContext);
}