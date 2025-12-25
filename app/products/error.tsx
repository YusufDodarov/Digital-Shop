'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="flex justify-center flex-col items-center mt-30">
      <h2 className="text-xl">{error.message}</h2>
      <div className="flex justify-between mt-6 gap-10">
        <Button variant="secondary" onClick={() => reset()}>Try again</Button>
        <Button onClick={() => router.push('/')}>Home</Button>
      </div>
    </div>
  );
}

export default ErrorPage;