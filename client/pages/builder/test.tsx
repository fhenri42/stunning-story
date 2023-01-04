import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const MyGoodTest = dynamic(() => import('@components/Diagram/goodTest'), {
  ssr: false,
});
export default function Test() {
  return (
    <div className="h-screen w-screen overflow-auto">
      <MyGoodTest />
    </div>
  );
}
