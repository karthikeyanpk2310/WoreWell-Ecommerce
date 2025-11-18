import { AuthForm } from '@/components/auth/AuthForm';
import { Card, CardContent } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <Card className="shadow-2xl">
      <CardContent className="p-8">
        <AuthForm type="login" />
      </CardContent>
    </Card>
  );
}
