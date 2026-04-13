
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Package, 
  Plus, 
  ShoppingBag, 
  TrendingUp, 
  Users,
  Landmark
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function SellerDashboard() {
  const stats = [
    { title: "Total Sales", value: "ETB 145,200", icon: TrendingUp, color: "text-green-600" },
    { title: "Active Orders", value: "24", icon: ShoppingBag, color: "text-blue-600" },
    { title: "Products", value: "12", icon: Package, color: "text-purple-600" },
    { title: "Avg Rating", value: "4.8", icon: BarChart3, color: "text-orange-600" }
  ];

  const recentOrders = [
    { id: "ORD-9281", customer: "Abebe Bikila", amount: 12500, status: "Delivered", date: "2023-10-24" },
    { id: "ORD-9282", customer: "Chala Mamo", amount: 3500, status: "Processing", date: "2023-10-25" },
    { id: "ORD-9283", customer: "Lensa Tolera", amount: 8200, status: "Pending", date: "2023-10-25" },
    { id: "ORD-9284", customer: "Ibrahim Ali", amount: 45000, status: "Shipped", date: "2023-10-26" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-headline font-bold">Seller Dashboard</h1>
            <p className="text-muted-foreground">Manage your products and track your sales performance.</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add New Product
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color} opacity-20`} />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>ETB {order.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={
                          order.status === "Delivered" ? "default" :
                          order.status === "Processing" ? "secondary" :
                          order.status === "Pending" ? "outline" : "outline"
                        }>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{order.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Users className="h-4 w-4" /> Manage Customers
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <BarChart3 className="h-4 w-4" /> Sales Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Package className="h-4 w-4" /> Inventory Logs
              </Button>
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10 mt-6">
                <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                  <Landmark className="h-4 w-4 text-primary" />
                  Banking Support
                </h4>
                <p className="text-xs text-muted-foreground">
                  Need help with your Coopay business account? Contact our dedicated merchant support.
                </p>
                <Button variant="link" size="sm" className="px-0 h-auto mt-2">Contact Support</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
