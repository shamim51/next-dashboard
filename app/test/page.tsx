// /components/Submit.tsx
'use client'

import test from "@/actions/test"
import Link from "next/link";
import { useState, useTransition } from 'react';
 
export default function AddToCartButton({userId, productId}: {userId: string, productId: string}) {
  let [isPending, startTransition] = useTransition();
  const[state, setState] = useState(false);

  const handleAddToCart = () => {
    console.log("inside handleAddToCart")
    startTransition(async () => {
      await test();
      setState(true); // Set state to true after add_to_cart is complete
    });
  }
  console.log("state", state)

  // if(state){
  //   return(
  //     <div className=" ">
  //     <Link href="/cart">
  //       <button className="text-white rounded-xl  bg-red-600 py-3 px-8  lg:px-16 lg:py-4"> test completed</button>
  //     </Link>
  //   </div>
  //   )
  // }
 
  return (
    <div className='h-screen flex items-center justify-center'>
      <button className="text-white rounded-xl  bg-blue-600 py-3 px-8  lg:px-16 lg:py-4" onClick={() => handleAddToCart()}>
        {isPending?"Testing.....": "Test"}
      </button>
    </div>

  );
}

//      <button className="text-white rounded-xl  bg-blue-600 py-3 px-8  lg:px-16 lg:py-4" onClick={() => startTransition(() => add_to_cart(userId, productId))}>