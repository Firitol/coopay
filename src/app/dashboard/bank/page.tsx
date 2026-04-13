import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Search, 
  AlertTriangle,
  History,
  Activity
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function BankDashboard() {
  const transactions = [
    { id: "TXN-001", type: "P2M Payment", amount: 45000, sender: "Buyer_129", merchant: "MegaElectronics", status: "Flagged", risk: "High" },
    { id: "TXN-002", type: "Settlement", amount: 120000, sender: "System", merchant: "AgriOromia", status: "Completed", risk: "Low" },
    { id: "TXN-003", type: "P2M Payment", amount: 1500, sender: "Buyer_842", merchant: "DestaBoutique", status: "Pending", risk: "Low" },
    { id: "TXN-004", type: "Refund", amount: 500, sender: "MegaElectronics", merchant: "Buyer_032", status: "Completed", risk: "Medium" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-headline font-bold flex items-center gap-3 flex-wrap">
              Bank Transaction Panel
              <Badge variant="outline" className="text-[10px] uppercase tracking-wider">Secure Access</Badge>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Internal tool for monitoring Coopay Market ecosystem transactions.</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm" className="gap-2 flex-1 md:flex-none"><History className="h-4 w-4" /> Logs</Button>
            <Button size="sm" className="gap-2 flex-1 md:flex-none"><Activity className="h-4 w-4" /> Live Monitor</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          <Card className="border-red-100 bg-red-50/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-red-600 mb-1">High Risk Alerts</p>
                  <h3 className="text-3xl font-bold">12</h3>
                </div>
                <ShieldAlert className="h-8 w-8 text-red-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-4">Requires manual verification</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-blue-600 mb-1">Pending Settlements</p>
                  <h3 className="text-3xl font-bold">48</h3>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-4">Scheduled for next batch</p>
            </CardContent>
          </Card>
          <Card className="border-green-100 bg-green-50/20 sm:col-span-2 lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-green-600 mb-1">Verified Today</p>
                  <h3 className="text-3xl font-bold">1,204</h3>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-4">99.8% auto-verified</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-7">
            <CardTitle className="text-xl font-bold">Transaction Ledger</CardTitle>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="TXN ID or Merchant..." className="pl-9 h-9 w-full sm:w-[250px]" />
            </div>
          </CardHeader>
          <CardContent className="overflow-x-auto p-0 sm:p-6 sm:pt-0">
            <div className="min-w-[800px] sm:min-w-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Entities</TableHead>
                    <TableHead>Amount (ETB)</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                      <TableCell>{tx.type}</TableCell>
                      <TableCell>
                        <div className="text-xs">
                          <span className="text-muted-foreground">From:</span> {tx.sender}
                          <br />
                          <span className="text-muted-foreground">To:</span> {tx.merchant}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">{tx.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <div className={`h-2 w-2 rounded-full ${
                            tx.risk === "High" ? "bg-red-500" : 
                            tx.risk === "Medium" ? "bg-yellow-500" : "bg-green-500"
                          }`} />
                          <span className="text-xs">{tx.risk}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          tx.status === "Flagged" ? "destructive" :
                          tx.status === "Completed" ? "default" : "outline"
                        } className="text-[10px]">
                          {tx.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Details</Button>
                        {tx.status === "Flagged" && (
                          <Button variant="ghost" size="sm" className="text-red-500">Resolve</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}