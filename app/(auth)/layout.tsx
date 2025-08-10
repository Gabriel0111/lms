import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, LibraryBig } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-svw">
      <Link
        href="/"
        className={buttonVariants({
          variant: "outline",
          className: "absolute top-4 left-4",
        })}
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>
      <div className="flex flex-col w-full max-w-sm gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 justify-center font-medium"
        >
          <LibraryBig className="size-4" />
          Gabriel
        </Link>
        {children}

        <div className="text-balance text-xs text-center text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <span className="hover:text-primary hover:underline">
            Terms of service
          </span>{" "}
          and{" "}
          <span className="hover:text-primary hover:underline">
            Privacy Policy
          </span>{" "}
        </div>
      </div>
    </div>
  );
}
