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
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-headline font-bold">Seller Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your products and track your sales performance.</p>
          </div>
          <Button className="gap-2 w-full md:w-auto">
            <Plus className="h-4 w-4" /> Add New Product
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-tight">{stat.title}</p>
                  <h3 className="text-xl md:text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color} opacity-20 shrink-0`} />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg md:text-xl">Recent Orders</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs">View All</Button>
            </CardHeader>
            <CardContent className="overflow-x-auto p-0 sm:p-6 sm:pt-0">
              <div className="min-w-[600px] sm:min-w-0">
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
                        <TableCell className="font-medium text-xs md:text-sm">{order.id}</TableCell>
                        <TableCell className="text-xs md:text-sm">{order.customer}</TableCell>
                        <TableCell className="text-xs md:text-sm font-semibold">ETB {order.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={
                            order.status === "Delivered" ? "default" :
                            order.status === "Processing" ? "secondary" :
                            order.status === "Pending" ? "outline" : "outline"
                          } className="text-[10px]">
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-xs md:text-sm">{order.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-2 h-11 text-sm">
                <Users className="h-4 w-4" /> Manage Customers
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 h-11 text-sm">
                <BarChart3 className="h-4 w-4" /> Sales Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 h-11 text-sm">
                <Package className="h-4 w-4" /> Inventory Logs
              </Button>
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10 mt-6">
                <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                  <Landmark className="h-4 w-4 text-primary" />
                  Banking Support
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Need help with your Coopay business account? Contact our dedicated merchant support team.
                </p>
                <Button variant="link" size="sm" className="px-0 h-auto mt-2 font-semibold">Contact Support</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}