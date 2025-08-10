import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ShieldX } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const NotAdmin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="bg-destructive/10 rounded-full p-4 w-fit mx-auto">
            <ShieldX className="size-16 text-destructive" />
          </div>

          <CardTitle className="text-2xl">Access Restricted</CardTitle>
          <CardDescription className="max-w-xl mx-auto">
            Hey! You are not an admin, which is means that you cannot access
            this kind of resources.
          </CardDescription>

          <CardContent className="mt-4">
            <Link href="/" className={buttonVariants({ className: "w-full" })}>
              <ArrowLeft className="size-4" />
              Back to home
            </Link>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default NotAdmin;
