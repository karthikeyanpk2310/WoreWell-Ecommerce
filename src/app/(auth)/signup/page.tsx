'use client';

import { Card, CardContent } from '@/components/ui/card';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const AuthForm = dynamic(() => import('@/components/auth/AuthForm').then(mod => mod.AuthForm), {
  ssr: false,
  loading: () => <Skeleton className="h-[600px] w-full" />,
});

export default function SignupPage() {
  return (
    <Card className="shadow-2xl">
      <CardContent className="p-8">
        <AuthForm type="signup" />
      </CardContent>
    </Card>
  );
}
