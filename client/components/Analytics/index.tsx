import React, { useEffect } from 'react';
import { analytics } from '@lib/firebase';

export default function AnalyticsComp(props: any) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      analytics();
    }
  }, []);
  return (
    <div className="h-screen w-screen overflow-hidden" />
  );
}
