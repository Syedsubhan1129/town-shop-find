import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getShopsByOwner, shops, Shop, Product, getProductsByShop, products, updateProduct } from "@/utils/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { cities } from "@/utils/data";
import { Store, Package, Plus, Edit, Trash } from "lucide-react";
import EditProductDialog from "@/components/products/EditProductDialog";

const ShopOwnerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const userShops = user ? getShopsByOwner(user.id) : [];
  
  const [newShop, setNewShop] = useState({
    name: "",
    city: "",
    address: "",
    description: "",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9c8a47a?q=80&w=1000&auto=format&fit=crop",
  });
  
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    discount: 0,
    inStock: true,
    category: "",
  });

  const handleAddShop = () => {
    if (!newShop.name || !newShop.city || !newShop.address) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }

    const shop: Shop = {
      id: (shops.length + 1).toString(),
      name: newShop.name,
      ownerId: user?.id || "",
      city: newShop.city,
      address: newShop.address,
      description: newShop.description,
      image: newShop.image,
    };

    shops.push(shop);
    
    toast({
      title: "Shop Added",
      description: `${shop.name} has been added successfully`,
    });
    
    setNewShop({
      name: "",
      city: "",
      address: "",
      description: "",
      image: "https://images.unsplash.com/photo-1604719312566-8912e9c8a47a?q=80&w=1000&auto=format&fit=crop",
    });
  };

  const handleAddProduct = () => {
    if (!selectedShop) return;
    
    if (!newProduct.name || !newProduct.description || newProduct.price <= 0 || !newProduct.category) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }

    const product: Product = {
      id: (products.length + 1).toString(),
      shopId: selectedShop.id,
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      image: newProduct.image,
      discount: newProduct.discount,
      inStock: newProduct.inStock,
      category: newProduct.category,
    };

    products.push(product);
    
    toast({
      title: "Product Added",
      description: `${product.name} has been added to ${selectedShop.name}`,
    });
    
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
      discount: 0,
      inStock: true,
      category: "",
    });
  };

  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
    setIsEditDialogOpen(true);
  };

  const handleProductUpdated = (updatedProduct: Product) => {
    // Force a re-render by updating some state
    const updatedShops = [...userShops];
    setSelectedShop(null);
    setTimeout(() => {
      setSelectedShop(selectedShop);
    }, 10);
    
    toast({
      title: "Product Updated",
      description: `${updatedProduct.name} has been updated successfully`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Shop Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your shops and products
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Add New Shop
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Shop</DialogTitle>
              <DialogDescription>
                Enter the details of your shop below
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="shop-name">Shop Name</Label>
                <Input
                  id="shop-name"
                  value={newShop.name}
                  onChange={(e) => setNewShop({ ...newShop, name: e.target.value })}
                  placeholder="e.g., Fashion Haven"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="shop-city">City</Label>
                <select
                  id="shop-city"
                  className="w-full p-2 border rounded-md"
                  value={newShop.city}
                  onChange={(e) => setNewShop({ ...newShop, city: e.target.value })}
                >
                  <option value="">Select a city</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="shop-address">Address</Label>
                <Input
                  id="shop-address"
                  value={newShop.address}
                  onChange={(e) => setNewShop({ ...newShop, address: e.target.value })}
                  placeholder="Shop address"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="shop-description">Description</Label>
                <Textarea
                  id="shop-description"
                  value={newShop.description}
                  onChange={(e) => setNewShop({ ...newShop, description: e.target.value })}
                  placeholder="Describe your shop"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="shop-image">Image URL</Label>
                <Input
                  id="shop-image"
                  value={newShop.image}
                  onChange={(e) => setNewShop({ ...newShop, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <Button className="w-full" onClick={handleAddShop}>
                Create Shop
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {userShops.length === 0 ? (
        <Card className="text-center p-8">
          <div className="flex flex-col items-center justify-center py-8">
            <Store className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Shops Yet</h2>
            <p className="text-muted-foreground mb-4">
              You haven't added any shops yet. Create your first shop to start selling products.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Shop
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                {/* Same content as the dialog above */}
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userShops.map((shop) => {
            const shopProducts = getProductsByShop(shop.id);
            return (
              <Card key={shop.id} className="overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{shop.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{shop.city}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm font-medium">Products</p>
                      <p className="text-2xl font-bold">{shopProducts.length}</p>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          onClick={() => setSelectedShop(shop)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Product
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Add New Product to {shop.name}</DialogTitle>
                          <DialogDescription>
                            Enter the details of your product below
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="product-name">Product Name</Label>
                            <Input
                              id="product-name"
                              value={newProduct.name}
                              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                              placeholder="e.g., Cotton T-Shirt"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="product-category">Category</Label>
                            <Input
                              id="product-category"
                              value={newProduct.category}
                              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                              placeholder="e.g., Clothing, Electronics"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="product-description">Description</Label>
                            <Textarea
                              id="product-description"
                              value={newProduct.description}
                              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                              placeholder="Describe your product"
                            />
                          </div>
                          
                          <div className="flex gap-4">
                            <div className="space-y-2 flex-1">
                              <Label htmlFor="product-price">Price (₹)</Label>
                              <Input
                                id="product-price"
                                type="number"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                                placeholder="0"
                              />
                            </div>
                            
                            <div className="space-y-2 flex-1">
                              <Label htmlFor="product-discount">Discount (%)</Label>
                              <Input
                                id="product-discount"
                                type="number"
                                value={newProduct.discount}
                                onChange={(e) => setNewProduct({ ...newProduct, discount: Number(e.target.value) })}
                                placeholder="0"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="product-image">Image URL</Label>
                            <Input
                              id="product-image"
                              value={newProduct.image}
                              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                              placeholder="https://example.com/image.jpg"
                            />
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="in-stock"
                              checked={newProduct.inStock}
                              onCheckedChange={(checked) => 
                                setNewProduct({ ...newProduct, inStock: checked })
                              }
                            />
                            <Label htmlFor="in-stock">In Stock</Label>
                          </div>
                          
                          <Button className="w-full" onClick={handleAddProduct}>
                            Add Product
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Recent Products</h4>
                    {shopProducts.length > 0 ? (
                      <div className="space-y-2">
                        {shopProducts.slice(0, 3).map((product) => (
                          <div 
                            key={product.id} 
                            className="flex items-center justify-between py-2 border-b last:border-b-0"
                          >
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded overflow-hidden mr-3">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div className="truncate max-w-[150px]">
                                <p className="font-medium truncate">{product.name}</p>
                                <p className="text-sm text-muted-foreground">₹{product.price}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button 
                                size="icon" 
                                variant="ghost"
                                onClick={() => handleEditProduct(product)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="ghost">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No products added yet
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Edit product dialog */}
      {productToEdit && (
        <EditProductDialog
          product={productToEdit}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onProductUpdated={handleProductUpdated}
        />
      )}
    </div>
  );
};

export default ShopOwnerDashboard;
