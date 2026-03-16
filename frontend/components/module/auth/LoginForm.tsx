"use client";

import { useState, useActionState, useEffect } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import InputFieldError from "@/components/shared/InputFieldError";
import { IInputErrorState } from "@/lib/getInputFieldError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { login } from "@/services/auth/auth.service";

export default function LoginForm({ redirect }: { redirect?: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [data, loginAction, isPending] = useActionState(login, null);

  useEffect(() => {
    if (data && !data?.success && data.message) {
      toast.error(data.message);
    }
  }, [data]);

  return (
    <form action={loginAction} className="space-y-5">
      {redirect && <input type="hidden" name="redirect" value={redirect} />}

      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1"
        >
          Email Address
        </Label>
        <div className="relative group">
          <Mail className="absolute z-1 left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors w-5 h-5 pointer-events-none" />
          <Input
            id="email"
            className="pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-slate-100"
            placeholder="name@example.com"
            type="email"
            name="email"
            defaultValue={(data?.formData?.email as string) || undefined}
            required
          />
        </div>
        <InputFieldError field="email" state={data as IInputErrorState} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center px-1">
          <Label
            htmlFor="password"
            className="text-sm font-semibold text-slate-700 dark:text-slate-300"
          >
            Password
          </Label>
          <Link
            href="/forgot-password"
            className="text-xs font-bold text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative group">
          <Lock className="absolute z-1 left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors w-5 h-5 pointer-events-none" />
          <Input
            id="password"
            className="pl-12 pr-12 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-slate-100"
            placeholder="••••••••"
            type={showPassword ? "text" : "password"}
            name="password"
            defaultValue={(data?.formData?.password as string) || undefined}
            required
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        <InputFieldError field="password" state={data as IInputErrorState} />
      </div>

      <div className="flex items-center space-x-2 py-1">
        <Checkbox
          id="remember"
          name="remember"
          className="w-4 h-4 rounded text-primary border border-slate-300 dark:border-slate-600"
        />
        <Label
          htmlFor="remember"
          className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer"
        >
          Keep me logged in
        </Label>
      </div>

      <Button
        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Signing In..." : "Sign In"}
      </Button>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-slate-950 px-4 text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-200"
          type="button"
          variant="outline"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            ></path>
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            ></path>
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            ></path>
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            ></path>
          </svg>
          <span className="text-sm font-semibold">Google</span>
        </Button>
        <Button
          className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-200"
          type="button"
          variant="outline"
        >
          <svg
            className="w-5 h-5 text-[#1877F2]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
          </svg>
          <span className="text-sm font-semibold">Facebook</span>
        </Button>
      </div>
    </form>
  );
}
