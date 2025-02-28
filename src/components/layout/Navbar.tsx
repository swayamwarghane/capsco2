import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, ShoppingBag, Menu, X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import CartPreview from "@/components/cart/CartPreview";
import AuthModal from "@/components/auth/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

interface NavbarProps {
  logo?: string;
  categories?: {
    name: string;
    subcategories?: { name: string; path: string }[];
    path: string;
  }[];
}

const Navbar = ({
  logo = "CapCo.",
  categories = [
    {
      name: "Snapback",
      path: "/category/snapback",
      subcategories: [
        { name: "Flat Brim", path: "/category/snapback/flat-brim" },
        { name: "Curved Brim", path: "/category/snapback/curved-brim" },
        { name: "Sports Teams", path: "/category/snapback/sports-teams" },
      ],
    },
    {
      name: "Fitted",
      path: "/category/fitted",
      subcategories: [
        { name: "Low Profile", path: "/category/fitted/low-profile" },
        { name: "High Crown", path: "/category/fitted/high-crown" },
        { name: "Stretch Fit", path: "/category/fitted/stretch-fit" },
      ],
    },
    {
      name: "Trucker",
      path: "/category/trucker",
      subcategories: [
        { name: "Mesh Back", path: "/category/trucker/mesh-back" },
        { name: "Foam Front", path: "/category/trucker/foam-front" },
        { name: "Vintage", path: "/category/trucker/vintage" },
      ],
    },
    {
      name: "Dad Caps",
      path: "/category/dad-caps",
      subcategories: [
        { name: "Cotton", path: "/category/dad-caps/cotton" },
        { name: "Washed", path: "/category/dad-caps/washed" },
        { name: "Embroidered", path: "/category/dad-caps/embroidered" },
      ],
    },
  ],
}: NavbarProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold">
              {logo}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList>
                  {categories.map((category) => (
                    <NavigationMenuItem key={category.name}>
                      {category.subcategories ? (
                        <>
                          <NavigationMenuTrigger>
                            {category.name}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[200px] gap-3 p-4">
                              <li className="font-medium">
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={category.path}
                                    className="block p-2 hover:bg-gray-100 rounded-md"
                                  >
                                    All {category.name}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                              {category.subcategories.map((subcategory) => (
                                <li key={subcategory.name}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      to={subcategory.path}
                                      className="block p-2 hover:bg-gray-100 rounded-md"
                                    >
                                      {subcategory.name}
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <Link to={category.path} className="block p-2">
                          {category.name}
                        </Link>
                      )}
                    </NavigationMenuItem>
                  ))}
                  <NavigationMenuItem>
                    <Link to="/customizer" className="block p-2">
                      Customize
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </Button>
                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white p-2 shadow-lg rounded-md">
                    <div className="flex items-center">
                      <Input
                        type="text"
                        placeholder="Search for caps..."
                        className="flex-1"
                        autoFocus
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSearchOpen(false)}
                        className="ml-1"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Account */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Account">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/account/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/account/orders">Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/account/wishlist">Wishlist</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAuthModal(true)}
                  aria-label="Login"
                >
                  <LogIn className="h-5 w-5" />
                </Button>
              )}

              {/* Cart */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  aria-label="Shopping cart"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                      {itemCount}
                    </span>
                  )}
                </Button>
                <CartPreview
                  isOpen={isCartOpen}
                  onClose={() => setIsCartOpen(false)}
                />
              </div>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4">
              <nav className="flex flex-col space-y-4">
                {categories.map((category) => (
                  <div key={category.name} className="flex flex-col">
                    <Link
                      to={category.path}
                      className="font-medium py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                    {category.subcategories && (
                      <div className="ml-4 flex flex-col space-y-2 mt-1">
                        {category.subcategories.map((subcategory) => (
                          <Link
                            key={subcategory.name}
                            to={subcategory.path}
                            className="text-gray-600 py-1"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subcategory.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link
                  to="/customizer"
                  className="font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Customize
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </>
  );
};

export default Navbar;
