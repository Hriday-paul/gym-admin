"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Mail } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LogoSection from "../LogoSection";
import { ForgetPassFormValues, forgetPassSchema } from "./Schema";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from "@/redux/api/auth.api";
import { useCookies } from "react-cookie";
import { config } from "@/utils/config";
import { toast } from "sonner";

export function ForgetPassForm() {
  const [postApi, { isLoading }] = useForgotPasswordMutation();
  const route = useRouter();
  const [_, setCookie] = useCookies(['token']);

  const form = useForm<ForgetPassFormValues>({
    resolver: zodResolver(forgetPassSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgetPassFormValues) => {
    try {
      const res = await postApi(values).unwrap();

      setCookie('token', res?.data?.token, {
        httpOnly: false,
        maxAge: 14 * 24 * 60 * 60, // 14 days
        path: '/',
        sameSite: 'lax',
        secure: config.hasSSL,
      });

      toast.success('Otp send to your email');

      route.push("/verify-email");

    } catch (err: any) {
      toast.error(err?.data?.message || 'Something went wrong, try again');
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Left Side - Purple Gradient with Logo */}
      <div className="flex-1">
        <LogoSection />
      </div>
      {/* Right Side - Login Form */}
      <div className="flex-1 bg-gray-50 flex flex-col items-center justify-center px-12">
        {/* forgot password form */}
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">
              Forgot Password
            </h2>
            <p className="text-gray-600">
              Please enter your email address to reset your password
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
                          placeholder="Enter your email"
                          className="pl-10 h-12 border-gray-300 focus:border-main-color focus:ring-main-color"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-main-color hover:bg-red-700 text-white font-medium text-base flex flex-row gap-x-2 items-center disabled:cursor-not-allowed"
              >
                Submit
                {isLoading ? <LoaderCircle className="animate-spin size-5 text-white" /> : <></>}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
