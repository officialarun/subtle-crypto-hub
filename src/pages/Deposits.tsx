import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { depositAPI } from '@/lib/api/depositAPI';

// Currently using 3 QR codes, will be expanded to 20 in future
const UPI_QR_CODES = [
  '/upi-qr-codes/WhatsApp Image 2025-04-08 at 11.58.21.jpeg',
  '/upi-qr-codes/WhatsApp Image 2025-04-08 at 11.58.50.jpeg',
  '/upi-qr-codes/WhatsApp Image 2025-04-08 at 11.59.51.jpeg'
];

// Deposit amount options
const DEPOSIT_AMOUNTS = [1000, 2000, 3000, 6000, 10000];

// Form validation schema
const depositSchema = z.object({
  amount: z.number().min(1000, 'Minimum deposit amount is ₹1000'),
  utrNumber: z.string().min(1, 'UTR number is required'),
  upiId: z.string().min(1, 'UPI ID is required'),
  paymentDate: z.string().min(1, 'Payment date is required')
});

interface DepositFormData {
  amount: number;
  utrNumber: string;
  upiId: string;
  paymentDate: string;
}

// Function to get the next available QR code index from localStorage
const getNextQRIndex = () => {
  const lastUsedIndex = localStorage.getItem('lastUsedQRIndex');
  let nextIndex = lastUsedIndex ? parseInt(lastUsedIndex) + 1 : 0;
  
  // Reset to 0 if we've used all QR codes
  if (nextIndex >= UPI_QR_CODES.length) {
    nextIndex = 0;
  }
  
  // Save the new index
  localStorage.setItem('lastUsedQRIndex', nextIndex.toString());
  return nextIndex;
};

// Function to get all used QR codes from localStorage
const getUsedQRCodes = () => {
  const usedQRCodes = localStorage.getItem('usedQRCodes');
  return usedQRCodes ? JSON.parse(usedQRCodes) : [];
};

// Function to get a random unused QR code
const getRandomUnusedQR = () => {
  const usedQRCodes = getUsedQRCodes();
  const availableQRCodes = UPI_QR_CODES.filter(qr => !usedQRCodes.includes(qr));
  
  if (availableQRCodes.length === 0) {
    // If all QR codes are used, clear the used list and start fresh
    localStorage.removeItem('usedQRCodes');
    return UPI_QR_CODES[Math.floor(Math.random() * UPI_QR_CODES.length)];
  }
  
  const randomQR = availableQRCodes[Math.floor(Math.random() * availableQRCodes.length)];
  // Add the new QR code to used list
  localStorage.setItem('usedQRCodes', JSON.stringify([...usedQRCodes, randomQR]));
  return randomQR;
};

const Deposits: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<DepositFormData>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      amount: 1000,
      paymentDate: new Date().toISOString().split('T')[0] // Set today's date as default
    },
  });

  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [assignedQR, setAssignedQR] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isGeneratingNewQR, setIsGeneratingNewQR] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Assign a QR code when component mounts
  useEffect(() => {
    const nextIndex = getNextQRIndex();
    const initialQR = UPI_QR_CODES[nextIndex];
    setAssignedQR(initialQR);
    // Add initial QR to used list
    const usedQRCodes = getUsedQRCodes();
    if (!usedQRCodes.includes(initialQR)) {
      localStorage.setItem('usedQRCodes', JSON.stringify([...usedQRCodes, initialQR]));
    }
    setIsLoading(false);
  }, []);

  const handleAmountChange = (amount: number) => {
    if (amount === selectedAmount) return;
    setSelectedAmount(amount);
    setValue('amount', amount);
  };

  const handleGenerateNewQR = () => {
    setIsGeneratingNewQR(true);
    const newQR = getRandomUnusedQR();
    setAssignedQR(newQR);
    setTimeout(() => setIsGeneratingNewQR(false), 100);
  };

  const onSubmit = async (data: DepositFormData) => {
    try {
      setIsSubmitting(true);
      console.log('Form submission data:', data);
      
      // Submit deposit
      const response = await depositAPI.submitDeposit({
        amount: data.amount,
        utrNumber: data.utrNumber,
        upiId: data.upiId,
        paymentDate: data.paymentDate
      });

      console.log('Deposit submission successful:', response);
      toast.success('Deposit submitted successfully');
      
      // Reset form
      setValue('utrNumber', '');
      setValue('upiId', '');
      setValue('paymentDate', new Date().toISOString().split('T')[0]);
    } catch (error) {
      console.error('Form submission error:', error);
      
      let errorMessage = 'Error submitting deposit';
      if (error instanceof Error) {
        if (error.message === 'No authentication token found') {
          errorMessage = 'Please login to submit a deposit';
        } else {
          errorMessage = error.message;
        }
      } else if (typeof error === 'object' && error !== null) {
        const axiosError = error as any;
        if (axiosError.response?.status === 401) {
          errorMessage = 'Your session has expired. Please login again.';
        } else if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        } else if (axiosError.response?.status) {
          errorMessage = `Server error (${axiosError.response.status}): ${axiosError.response.statusText}`;
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Make a Deposit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* QR Code Section */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Scan QR Code</h3>
                <div className="flex justify-center">
                  <div className="relative">
                    <img
                      src={assignedQR}
                      alt="UPI QR Code"
                      className={`w-64 h-64 object-contain border border-gray-200 rounded-lg transition-opacity duration-200 ${
                        isLoading || isGeneratingNewQR ? 'opacity-50' : 'opacity-100'
                      }`}
                      onError={(e) => {
                        // Fallback to a placeholder if the image fails to load
                        e.currentTarget.src = 'https://via.placeholder.com/256?text=UPI+QR+Code';
                      }}
                    />
                    {(isLoading || isGeneratingNewQR) && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Scan this QR code using any UPI app to make payment
                </p>
                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateNewQR}
                    disabled={isLoading || isGeneratingNewQR}
                  >
                    {isGeneratingNewQR ? 'Generating...' : 'Generate New QR'}
                  </Button>
                </div>
              </div>

              {/* Amount Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Select Amount</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {DEPOSIT_AMOUNTS.map((amount) => (
                    <Button
                      key={amount}
                      variant={selectedAmount === amount ? 'default' : 'outline'}
                      className="w-full"
                      onClick={() => handleAmountChange(amount)}
                      disabled={isLoading || isGeneratingNewQR}
                    >
                      ₹{amount.toLocaleString()}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* UTR Form Section */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Selected Amount</Label>
                  <Input
                    id="amount"
                    type="text"
                    value={`₹${selectedAmount.toLocaleString()}`}
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="utrNumber">UTR Number</Label>
                  <Input
                    id="utrNumber"
                    placeholder="Enter UTR number from your UPI app"
                    {...register('utrNumber')}
                  />
                  {errors.utrNumber && (
                    <p className="text-sm text-red-500">{errors.utrNumber.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID Used</Label>
                  <Input
                    id="upiId"
                    placeholder="Enter the UPI ID you used for payment"
                    {...register('upiId')}
                  />
                  {errors.upiId && (
                    <p className="text-sm text-red-500">{errors.upiId.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentDate">Payment Date</Label>
                  <Input
                    id="paymentDate"
                    type="date"
                    {...register('paymentDate')}
                  />
                  {errors.paymentDate && (
                    <p className="text-sm text-red-500">{errors.paymentDate.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Deposit'}
                </Button>
              </form>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-800 mb-2">Important Notes</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Make sure to enter the correct UTR number</li>
                  <li>• The UPI ID should match the one used for payment</li>
                  <li>• Deposits are processed within 24 hours</li>
                  <li>• Contact support if you face any issues</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Deposits; 