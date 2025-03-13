import type React from "react"
import { DashboardSidebar } from "@/components/sidebar"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // In a real app, you would verify the session server-side
  const cookieStore = cookies()
  const hasSession = cookieStore.has("user") || process.env.NODE_ENV === "development"

  if (!hasSession) {
    redirect("/login")
  }

  return <DashboardSidebar>{children}</DashboardSidebar>
}

