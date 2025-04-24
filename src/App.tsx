import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

// Lazy load pages
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const CustomizerPage = lazy(() => import("./pages/CustomizerPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <p>Loading...</p>
            </div>
          }
        >
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/customizer" element={<CustomizerPage />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route
                path="/category/:categoryId/:subcategoryId"
                element={<CategoryPage />}
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/account/:section" element={<AccountPage />} />
            </Routes>
          </>
        </Suspense>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
