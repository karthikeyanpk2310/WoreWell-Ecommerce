import { Card, CardContent } from '@/components/ui/card';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const AuthForm = dynamic(() => import('@/components/auth/AuthForm').then(mod => mod.AuthForm), {
  ssr: false,
  loading: () => <Skeleton className="h-[400px] w-full" />,
});

export default function LoginPage() {
  return (
    <Card className="shadow-2xl">
      <CardContent className="p-8">
        <AuthForm type="login" />
      </CardContent>
    </Card>
  );
}
