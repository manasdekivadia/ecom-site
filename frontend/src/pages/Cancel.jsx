import React from 'react'
import { XCircle } from 'lucide-react';
const Cancel = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 px-4">
      <XCircle className="w-20 h-20 text-red-600 mb-6" />
      <h1 className="text-4xl font-bold text-red-800 mb-4">Payment Cancelled</h1>
      <p className="text-lg text-red-700 text-center max-w-md">
        Your payment was cancelled. If this was a mistake, you can try again from your orders page.
      </p>
    </div>
  );
};

export default Cancel;
