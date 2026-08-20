import type { Metadata } from "next";
import ForgotPasswordClient from "@/components/portal/ForgotPasswordClient";

export const metadata: Metadata = {
  title: "Reset Password | Tyflex Document Portal",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
