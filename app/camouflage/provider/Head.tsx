import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BYUNSBoard",
};

export default function HeadProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
