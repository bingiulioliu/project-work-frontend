import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { WishlistProvider } from "./contexts/WishlistContext.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import { NewsletterProvider } from "./contexts/NewsletterContext.jsx";
import ProductList from "./pages/ProductsList.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import ChiSiamo from "./pages/ChiSiamo.jsx";
import ProductsList from "./pages/ProductsList.jsx";
import ScrollToTop from "./hooks/ScrollToTop.jsx";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ScrollToTop/>
        <NewsletterProvider>
        <WishlistProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="products" element={<ProductsList />} />
              <Route path="products/:slug" element={<ProductDetails />} />
              <Route path="chi-siamo" element={<ChiSiamo />} />
              <Route path="preferiti" element={<Wishlist />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </WishlistProvider>
        </NewsletterProvider>
      </ThemeProvider>
    </BrowserRouter>

  );
}
export default App;
