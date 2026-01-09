import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldContent } from "@/components/ui/field";
import { ArrowLeft, Loader2, Mail, CheckCircle } from "lucide-react";
import ForgotPasswordForm from "@/components/module/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                false ? "bg-accent/20" : "bg-primary/10"
              }`}
            >
              {false ? (
                <CheckCircle className="h-6 w-6 text-accent" />
              ) : (
                <Mail className="h-6 w-6 text-primary" />
              )}
            </div>
            <CardTitle className="text-2xl">
              {false ? "Check Your Email" : "Forgot Password?"}
            </CardTitle>
            <CardDescription>
              {false
                ? `We've sent password reset instructions to ${"state?.email"}`
                : "Enter your email address and we'll send you instructions to reset your password"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ForgotPasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
