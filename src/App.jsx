import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import MainLayout from "./layouts/MainLayout";

import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import ChiSiamo from "./pages/ChiSiamo";
import ProductsList from "./pages/ProductsList";
import ScrollToTop from "./hooks/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ScrollToTop/>
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
      </ThemeProvider>
    </BrowserRouter>

  );
}
export default App;
