import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title:"Aayush Kumar Singh | Software Engineer",description:"Portfolio of Aayush Kumar Singh — Java, Spring Boot, cloud engineering, full-stack applications and AI projects.",openGraph:{title:"Aayush Kumar Singh | Software Engineer",description:"Backend engineering, full-stack development and AI projects.",type:"website"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body>{children}</body></html>}