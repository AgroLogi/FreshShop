"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function SimpleOrderConfirmation() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        <h1 className="text-3xl font-bold text-green-600 mt-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mt-4">
          Thank you for your purchase! Your order has been successfully placed. We will send you a confirmation email with the details shortly.
        </p>

        <button
          className="mt-6 bg-green-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300"
          onClick={() => router.push('/')}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
