import type { Metadata } from "next";
import ResetPasswordClient from "@/components/portal/ResetPasswordClient";

export const metadata: Metadata = {
  title: "Set New Password | Tyflex Document Portal",
};

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage(props: ResetPasswordPageProps) {
  const searchParams = await props.searchParams;
  return <ResetPasswordClient token={searchParams.token} />;
}
