import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

const ForgotPasswordForm = ({ onBackToLogin }: ForgotPasswordFormProps) => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Email validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const { error } = await resetPassword(email);

      if (error) {
        setError(error.message || "Failed to send reset password email");
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch (err: any) {
      console.error("Password reset error:", err);
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Check Your Email
          </CardTitle>
          <CardDescription className="text-center">
            We've sent password reset instructions to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="text-center text-sm text-gray-500 mb-6">
            If you don't see the email, please check your spam folder.
          </p>
          <Button className="w-full" onClick={onBackToLogin}>
            Back to Login
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
        <CardDescription>
          Enter your email address and we'll send you a link to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-gray-500" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="focus:ring-2 focus:ring-blue-500"
              autoComplete="email"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading || !email}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={onBackToLogin}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Login
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ForgotPasswordForm;
