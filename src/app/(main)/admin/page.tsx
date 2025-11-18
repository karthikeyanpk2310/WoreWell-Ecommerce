import { AddProductForm } from "@/components/admin/AddProductForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <div className="max-w-2xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Add New Product</CardTitle>
                <CardDescription>Fill out the form below to add a new product to the store.</CardDescription>
            </CardHeader>
            <CardContent>
                <AddProductForm />
            </CardContent>
        </Card>
    </div>
  );
}
