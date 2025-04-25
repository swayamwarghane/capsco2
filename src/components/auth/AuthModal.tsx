import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

interface AuthModalProps {
  trigger?: React.ReactNode;
  defaultTab?: "login" | "register" | "forgot-password";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AuthModal = ({
  trigger,
  defaultTab = "login",
  open,
  onOpenChange,
}: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "register" | "forgot-password">(defaultTab);

  const handleSuccess = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-md">
        {activeTab === "forgot-password" ? (
          <ForgotPasswordForm
            onBackToLogin={() => setActiveTab("login")}
          />
        ) : (
          <Tabs
            defaultValue={activeTab}
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "login" | "register")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-4">
              <LoginForm
                onSuccess={handleSuccess}
                onRegisterClick={() => setActiveTab("register")}
                onForgotPasswordClick={() => setActiveTab("forgot-password")}
              />
            </TabsContent>
            <TabsContent value="register" className="mt-4">
              <RegisterForm
                onSuccess={handleSuccess}
                onLoginClick={() => setActiveTab("login")}
              />
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
