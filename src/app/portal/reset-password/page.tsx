import type { Metadata } from "next";
import ResetPasswordClient from "@/components/portal/ResetPasswordClient";

export const metadata: Metadata = {
  title: "Set New Password | Tyflex Document Portal",
};

interface ResetPasswordPageProps {
  searchParams: { token?: string };
}

export default function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  return <ResetPasswordClient token={searchParams.token} />;
}
