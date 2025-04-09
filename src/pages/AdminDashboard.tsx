import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Search, LogOut, DollarSign, Activity } from 'lucide-react';
import { depositAPI } from '@/lib/api/depositAPI';

interface Deposit {
  _id: string;
  userId: {
    _id: string;
    name: string;
    phoneNumber: string;
  };
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  paymentDate: string;
  utrNumber: string;
  upiId: string;
}

interface DepositStats {
  totalDeposits: number;
  pendingDeposits: number;
  approvedDeposits: number;
  totalAmount: number;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [stats, setStats] = useState<DepositStats>({
    totalDeposits: 0,
    pendingDeposits: 0,
    approvedDeposits: 0,
    totalAmount: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin');
      return;
    }

    // Fetch initial data
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [depositsResponse, statsResponse] = await Promise.all([
        depositAPI.getAllDeposits(),
        depositAPI.getDepositStats()
      ]);

      setDeposits(depositsResponse.deposits);
      setStats(statsResponse.stats);
    } catch (error) {
      toast.error('Error fetching data');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const handleStatusUpdate = async (depositId: string, status: 'approved' | 'rejected') => {
    try {
      await depositAPI.updateDepositStatus(depositId, status);
      toast.success(`Deposit ${status} successfully`);
      fetchData(); // Refresh data
    } catch (error) {
      toast.error('Error updating deposit status');
      console.error('Error:', error);
    }
  };

  const filteredDeposits = deposits.filter(deposit => {
    const searchLower = searchQuery.toLowerCase();
    return (
      deposit.userId.name.toLowerCase().includes(searchLower) ||
      deposit.userId.phoneNumber.includes(searchLower) ||
      deposit.amount.toString().includes(searchLower) ||
      deposit.utrNumber.toLowerCase().includes(searchLower) ||
      deposit.upiId.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDeposits}</div>
              <p className="text-xs text-muted-foreground">All time deposits</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Deposits</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingDeposits}</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.totalAmount}</div>
              <p className="text-xs text-muted-foreground">Approved deposits</p>
            </CardContent>
          </Card>
        </div>

        {/* Deposits Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Deposits</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search deposits..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading deposits...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>UTR Number</TableHead>
                    <TableHead>UPI ID</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDeposits.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center">
                        No deposits found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDeposits.map((deposit) => (
                      <TableRow key={deposit._id}>
                        <TableCell>{deposit.userId.name}</TableCell>
                        <TableCell>{deposit.userId.phoneNumber}</TableCell>
                        <TableCell>₹{deposit.amount}</TableCell>
                        <TableCell>{deposit.utrNumber}</TableCell>
                        <TableCell>{deposit.upiId}</TableCell>
                        <TableCell>
                          {new Date(deposit.paymentDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              deposit.status === 'approved'
                                ? 'bg-green-100 text-green-800'
                                : deposit.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {deposit.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {deposit.status === 'pending' && (
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-green-500 text-white hover:bg-green-600"
                                onClick={() => handleStatusUpdate(deposit._id, 'approved')}
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-red-500 text-white hover:bg-red-600"
                                onClick={() => handleStatusUpdate(deposit._id, 'rejected')}
                              >
                                Reject
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard; 