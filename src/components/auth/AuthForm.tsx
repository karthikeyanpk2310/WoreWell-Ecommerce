
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import {
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  Users,
  Loader2,
} from 'lucide-react';
import { useState } from 'react';
import { Checkbox } from '../ui/checkbox';

const signupSchema = z.object({
  name: z.string().min(1, 'Full name is required').regex(/^[a-zA-Z\s]+$/, 'Only letters and spaces are allowed'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Must be a 10-digit Indian phone number'),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select a gender',
  }),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one symbol'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().default(false).optional(),
});

type AuthFormProps = {
  type: 'login' | 'signup';
};

const InputWithIcon = ({ icon, children }: { icon: React.ReactNode, children: React.ReactNode }) => (
    <div className="relative flex items-center">
        <span className="absolute left-3 text-muted-foreground">{icon}</span>
        <div className="w-full pl-10">{children}</div>
    </div>
);


export function AuthForm({ type }: AuthFormProps) {
  const { login, signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(type === 'login' ? loginSchema : signupSchema),
    defaultValues:
      type === 'login'
        ? { email: '', password: '', rememberMe: false }
        : {
            name: '',
            email: '',
            phone: '',
            gender: undefined,
            password: '',
            address: '',
          },
  });

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    if (type === 'login') {
      await login(values.email, values.password);
    } else {
      await signup(values);
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-headline text-gray-800 dark:text-gray-200">
          {type === 'login' ? 'Login to Wore Well' : 'Create Your Wore Well Account'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {type === 'login' ? 'Welcome back!' : 'Join our fashion community.'}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {type === 'signup' && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <InputWithIcon icon={<User size={16} />}>
                    <Input placeholder="Full Name" {...field} />
                  </InputWithIcon>
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <InputWithIcon icon={<Mail size={16} />}>
                  <Input type="email" placeholder="Email" {...field} />
                </InputWithIcon>
                <FormMessage className="ml-2"/>
              </FormItem>
            )}
          />

          {type === 'signup' && (
            <>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                     <InputWithIcon icon={<Phone size={16} />}>
                        <Input placeholder="10-digit Phone Number" {...field} />
                    </InputWithIcon>
                    <FormMessage className="ml-2" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3 rounded-lg border p-4">
                     <div className="flex items-center gap-3">
                        <Users size={16} className="text-muted-foreground" />
                        <FormLabel>Gender</FormLabel>
                     </div>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="male" />
                          </FormControl>
                          <FormLabel className="font-normal">Male</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="female" />
                          </FormControl>
                          <FormLabel className="font-normal">Female</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="other" />
                          </FormControl>
                          <FormLabel className="font-normal">Other</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <InputWithIcon icon={<Lock size={16} />}>
                    <Input type="password" placeholder="Password" {...field} />
                </InputWithIcon>
                <FormMessage className="ml-2"/>
              </FormItem>
            )}
          />
          
          {type === 'signup' && (
             <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <InputWithIcon icon={<MapPin size={16} />}>
                        <Textarea placeholder="Full Address" {...field} />
                    </InputWithIcon>
                    <FormMessage className="ml-2" />
                  </FormItem>
                )}
              />
          )}

          {type === 'login' && (
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Remember me
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <Link href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
          )}

          <Button type="submit" className="w-full bg-gradient-primary hover:scale-105 hover:-translate-y-px transition-transform duration-200" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {type === 'login' ? 'Login' : 'Create Account'}
          </Button>
        </form>
      </Form>
      
      <p className="pt-6 text-center text-sm text-muted-foreground">
        {type === 'login' ? (
          <>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Login
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
