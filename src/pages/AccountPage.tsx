import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Package, Heart, LogOut, ShoppingCart } from "lucide-react";
import CartPreview from "@/components/cart/CartPreview";

const AccountPage = () => {
  const { section = "profile" } = useParams<{ section: string }>();
  const { user, loading, signOut } = useAuth();
  const { addItem } = useCart();
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleTabChange = (value: string) => {
    navigate(`/account/${value}`);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center mb-6">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123" />
                      <AvatarFallback>
                        {user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold">{user.email}</h2>
                  </div>

                  <nav className="space-y-2">
                    <Button
                      variant={section === "profile" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => handleTabChange("profile")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button
                      variant={section === "orders" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => handleTabChange("orders")}
                    >
                      <Package className="mr-2 h-4 w-4" />
                      Orders
                    </Button>
                    <Button
                      variant={section === "wishlist" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => handleTabChange("wishlist")}
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              {section === "profile" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          defaultValue=""
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          defaultValue=""
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user.email || ""}
                        disabled
                      />
                      <p className="text-sm text-gray-500">
                        Your email address cannot be changed
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        defaultValue=""
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Shipping Address</Label>
                      <Input
                        id="address"
                        defaultValue=""
                        placeholder="Enter your address"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              )}

              {section === "orders" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>
                      View and track your orders
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Sample order history */}
                    <div className="space-y-6">
                      {[
                        {
                          id: "ORD-12345",
                          date: "June 15, 2023",
                          status: "Delivered",
                          total: 64.98,
                          items: 2,
                        },
                        {
                          id: "ORD-12346",
                          date: "May 22, 2023",
                          status: "Delivered",
                          total: 39.99,
                          items: 1,
                        },
                      ].map((order) => (
                        <div key={order.id} className="border rounded-lg p-4">
                          <div className="flex flex-wrap justify-between items-center mb-4">
                            <div>
                              <h3 className="font-semibold">{order.id}</h3>
                              <p className="text-sm text-gray-500">
                                {order.date}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                                {order.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div>
                              <p className="text-sm text-gray-600">
                                {order.items} items
                              </p>
                              <p className="font-medium">
                                ${order.total.toFixed(2)}
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}

                      {/* Empty state */}
                      {false && (
                        <div className="text-center py-12">
                          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium mb-2">
                            No orders yet
                          </h3>
                          <p className="text-gray-500 mb-6">
                            When you place orders, they will appear here
                          </p>
                          <Button>Start Shopping</Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {section === "wishlist" && (
                <Card>
                  <CardHeader>
                    <CardTitle>My Wishlist</CardTitle>
                    <CardDescription>
                      Items you've saved for later
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Sample wishlist items */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        {
                          id: "1",
                          name: "Premium Snapback Cap",
                          price: 39.99,
                          image:
                            "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500&auto=format&fit=crop",
                        },
                        {
                          id: "2",
                          name: "Vintage Trucker Cap",
                          price: 34.99,
                          image:
                            "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=500&auto=format&fit=crop",
                        },
                      ].map((item) => (
                        <div
                          key={item.id}
                          className="border rounded-lg overflow-hidden"
                        >
                          <div className="h-48 overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover max-w-none"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium mb-2">{item.name}</h3>
                            <p className="text-blue-600 font-bold mb-4">
                              ${item.price.toFixed(2)}
                            </p>
                            <div className="flex space-x-2">
                              <Button
                                className="flex-1"
                                onClick={() => {
                                  addItem({
                                    id: item.id,
                                    name: item.name,
                                    price: item.price,
                                    quantity: 1,
                                    color: "#000000",
                                    size: "M",
                                    image: item.image,
                                  });
                                  setShowCart(true);
                                }}
                              >
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Add to Cart
                              </Button>
                              <Button variant="outline" size="icon">
                                <Heart className="h-4 w-4 fill-current" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Empty state */}
                    {false && (
                      <div className="text-center py-12">
                        <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">
                          Your wishlist is empty
                        </h3>
                        <p className="text-gray-500 mb-6">
                          Save items you like for later
                        </p>
                        <Button>Browse Products</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Cart Preview */}
    <CartPreview isOpen={showCart} onClose={() => setShowCart(false)} />
  );
};

export default AccountPage;
