import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Product, updateProduct } from "@/utils/data";

interface EditProductDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductUpdated: (updatedProduct: Product) => void;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({
  product,
  open,
  onOpenChange,
  onProductUpdated,
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    discount: product.discount,
    inStock: product.inStock,
    category: product.category,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // If we had a real backend, we would upload the file here
      // For now, we'll just use the URL directly or keep the existing image
      let imageUrl = formData.image;
      
      if (imageFile) {
        // In a real app with backend, we would upload the file here
        // For this demo, we'll create a temporary URL
        imageUrl = URL.createObjectURL(imageFile);
      }

      const updatedProduct = updateProduct(product.id, {
        ...formData,
        image: imageUrl,
      });

      if (updatedProduct) {
        toast({
          title: "Product Updated",
          description: `${updatedProduct.name} has been updated successfully`,
        });
        
        onProductUpdated(updatedProduct);
        onOpenChange(false);
      }
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update product",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Only accept jpeg, jpg, and png files
      if (file.type === "image/jpeg" || file.type === "image/png") {
        setImageFile(file);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a JPEG or PNG image",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-product-name">Product Name</Label>
            <Input
              id="edit-product-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Cotton T-Shirt"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-product-category">Category</Label>
            <Input
              id="edit-product-category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="e.g., Clothing, Electronics"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-product-description">Description</Label>
            <Textarea
              id="edit-product-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your product"
              required
            />
          </div>
          
          <div className="flex gap-4">
            <div className="space-y-2 flex-1">
              <Label htmlFor="edit-product-price">Price (₹)</Label>
              <Input
                id="edit-product-price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                placeholder="0"
                required
              />
            </div>
            
            <div className="space-y-2 flex-1">
              <Label htmlFor="edit-product-discount">Discount (%)</Label>
              <Input
                id="edit-product-discount"
                type="number"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                placeholder="0"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-product-image">Image</Label>
            <div className="flex items-center gap-4 mb-2">
              <img 
                src={imageFile ? URL.createObjectURL(imageFile) : formData.image} 
                alt="Product preview" 
                className="w-20 h-20 object-cover rounded border"
              />
              <div>
                <Input
                  id="edit-product-image-file"
                  type="file"
                  onChange={handleImageChange}
                  accept="image/jpeg,image/png"
                  className="mb-2"
                />
                <p className="text-xs text-gray-500">Upload JPG/PNG or use URL</p>
              </div>
            </div>
            <Input
              id="edit-product-image-url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="edit-in-stock"
              checked={formData.inStock}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, inStock: checked })
              }
            />
            <Label htmlFor="edit-in-stock">In Stock</Label>
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
