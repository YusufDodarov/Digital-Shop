'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-8xl font-bold animate-bounce">404</h1>
      <p className="text-xl  my-4">Oops! The page you are looking for does not exist.</p>
      <Button asChild><Link href="/">Go Home</Link></Button>
    </div>
  );
}
