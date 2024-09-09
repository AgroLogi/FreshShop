"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const jwt = sessionStorage.getItem("jwt");
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const router = useRouter();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    if (!jwt) {
      router.push("/sign-in");
    } else {
      getCartItems();
    }
  }, []);

  // Fetch total cart items
  const getCartItems = async () => {
    if (!user) return; // Return early if user is null or undefined
    try {
      const cartItemsList = await GlobalApi.getTotalCartItems(user.id, jwt);
      setTotalCartItem(cartItemsList.length);
      setCartItemList(cartItemsList);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    // Calculate subtotal whenever cartItemList changes
    let total = cartItemList.reduce((acc, item) => acc + item.amount, 0);
    setSubTotal(total);
  }, [cartItemList]);

  // Calculate the total amount including delivery fee
  const calculateTotalAmount = () => {
    const totalAmount = subTotal + 15;
    return totalAmount.toFixed(2);
  };

  // Create order and save it inside Strapi
  const createOrder = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior

    // Create the payload with form data
    const payload = {
      data:{
        totalOrderAmount: calculateTotalAmount(),
        name: name,
        email: email,
        address: address,
        phone: phone,
        zip: zip,
        userId: user.id,
        orderItemList: cartItemList.map(item => ({
          product: item.product, // Ensure the product ID or relevant identifier is sent
          quantity: item.quantity,
          amount: item.amount
        }))
      }
    };

    console.log("Payload:", payload); // Debug the payload
    GlobalApi.createOrder(payload, jwt).then(res=>{
        console.log(res)
        toast("Order created successfully");

    })
    // try {
    //   const res = await GlobalApi.createOrder(payload, jwt);
    //   console.log("Response:", res);
    //   toast("Order created successfully");
    //   router.push('/order-confirmation');
    // } catch (error) {
    //   console.error("Error creating order:", error);
    //   toast.error("Failed to create order");
    // }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4 bg-green-400 w-[100%]">Checkout</h1>
      <div className='flex gap-10 items-center justify-center'>
        <form onSubmit={createOrder} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
            <input type="text" id="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
            <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone</label>
            <input type="tel" id="phone" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="zip" className="block text-gray-700 font-bold mb-2">Zip</label>
            <input type="text" id="zip" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={zip} onChange={(e) => setZip(e.target.value)} required />
          </div>
          <div className="col-span-2">
            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
            <textarea id="address" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 col-span-2" type="submit">
            Place Order
          </button>
        </form>
        <div className="mt-4">
          <div className="bg-gray-200 p-4 rounded-md">
            <h2 className="text-gray-700 font-bold mb-2">Total Cart {totalCartItem}</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Subtotal:</span>
              <span className="text-gray-700 font-bold">&#8377;{subTotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Delivery:</span>
              <span className="text-gray-700 font-bold">&#8377;15.00</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between">
              <span className="text-gray-700 font-bold">Total:</span>
              <span className="text-gray-700 font-bold">&#8377;{calculateTotalAmount()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}