"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, Lock, LoaderCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { LoginFormValues, loginSchema } from "./Schema";
import LogoSection from "../LogoSection";
import { useLoginAdminMutation } from "@/redux/api/auth.api";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { config } from "@/utils/config";
import { addUserDetails } from "@/redux/slices/userSlice";

export function LoginForm() {
  const [postLogin, { isLoading }] = useLoginAdminMutation();
  const [_, setCookie] = useCookies(['accessToken', 'refreshToken']);

  const route = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const res = await postLogin(values).unwrap();

      setCookie('accessToken', res?.data?.accessToken, {
        httpOnly: false,
        maxAge: 14 * 24 * 60 * 60, // 14 days
        path: '/',
        sameSite: 'lax',
        secure: config.hasSSL,
      });

      setCookie('refreshToken', res?.data?.refreshToken, {
        httpOnly: false,
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
        sameSite: 'lax',
        secure: config.hasSSL,
      });

      dispatch(addUserDetails({ name: res?.data?.user?.first_name, role: res?.data?.user?.role, profilePicture: res?.data?.user?.image || "/empty-user.png" }));

      toast.success('Signin successfully');

      route.push("/dashboard");


    } catch (err: any) {
      toast.error(err?.data?.message || 'Something went wrong, try again');
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Left Side - Purple Gradient with Logo */}
      <div className="flex-1 ">
        <LogoSection />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 bg-gray-50 flex flex-col items-center justify-center px-12">
        {/* Login Form */}
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Log In</h2>
            <p className="text-gray-600">
              Access the Admin control panel using your email and password.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email/Phone Input */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          type="text"
                          placeholder="Enter your email or phone number"
                          className="pl-10 h-12 border-gray-300 focus:border-main-color focus:ring-main-color"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Input */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className="pl-10 h-12 border-gray-300 focus:border-main-color focus:ring-main-color"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Forgot Password Link */}
              <div className="text-left">
                <Link
                  href="/forget-password"
                  className="text-sm text-main-color hover:text-red-700"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-main-color hover:bg-red-600 text-white font-medium text-base flex flex-row gap-x-2 items-center disabled:cursor-not-allowed"
              >
                Log In
                {isLoading ? <LoaderCircle className="animate-spin size-5 text-white" /> : <></>}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
