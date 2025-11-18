import { AuthForm } from '@/components/auth/AuthForm';
import { Card, CardContent } from '@/components/ui/card';

export default function SignupPage() {
  return (
    <Card className="shadow-2xl">
      <CardContent className="p-8">
        <AuthForm type="signup" />
      </CardContent>
    </Card>
  );
}
