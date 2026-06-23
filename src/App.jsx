import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import MainLayout from "./layouts/MainLayout";
import { NewsletterProvider } from "./contexts/NewsletterContext";
import Catalogo from "./pages/PaginaCatalogo";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <NewsletterProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="products" element={<Catalogo />} />
              <Route path="products/:slug" element={<ProductDetails />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </NewsletterProvider>
      </ThemeProvider>
    </BrowserRouter>

  );
}
export default App;
