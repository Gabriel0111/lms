"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { RefObject, useEffect, useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const VerifyRequest = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isOtpPending, startOtpTransition] = useTransition();

  const params = useSearchParams();
  const email = params.get("email") as string;

  const otpRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    otpRef.current?.focus();
  }, [otp]);

  function verifyOtp() {
    startOtpTransition(async () => {
      await authClient.signIn.emailOtp({
        email,
        otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email verified");
            router.push("/");
          },
          onError: (error) => {
            console.log(error);
            toast.error("Error verifying Email or OTP");
            setOtp("");
            otpRef.current?.focus();
          },
        },
      });
    });
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Please check your email</CardTitle>
        <CardDescription>
          We have sent a verification email code to your email account. Please
          paste the code below.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
            ref={otpRef}
          >
            <InputOTPGroup>
              {[0, 1, 2].map((num) => (
                <InputOTPSlot index={num} key={num} />
              ))}
            </InputOTPGroup>
            <InputOTPGroup>
              {[3, 4, 5].map((num) => (
                <InputOTPSlot index={num} key={num} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code sent to your email
          </p>
        </div>
        <Button
          className="w-full"
          disabled={isOtpPending || otp.length != 6}
          onClick={verifyOtp}
        >
          {isOtpPending && <Loader className="size-4 animate-spin" />}
          Verify Account
        </Button>
      </CardContent>
    </Card>
  );
};

export default VerifyRequest;
