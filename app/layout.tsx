import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "bskytest",
  description: "test",
};

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/Sidebar";
import { InitalAppLoader } from "@/components/app/InitalApp";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<html lang="en">
			<body className={`$${geistMono.variable} antialiased bg-ctp-base text-ctp-text`} >
				<InitalAppLoader/>
				<SidebarProvider>
					<AppSidebar/>
					<SidebarTrigger className="fixed z-50"/>
				</SidebarProvider>
				<main>
					{children}
				</main>
				<Toaster/>
			</body>
		</html>
	);
}
