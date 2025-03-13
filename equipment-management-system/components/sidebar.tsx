"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  AlertTriangle,
  BarChart3,
  Construction,
  DollarSign,
  Home,
  LogOut,
  Package,
  Settings,
  Truck,
  Users,
} from "lucide-react"
import { useRouter } from "next/navigation"

export function DashboardSidebar({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(true)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  // Define navigation items based on user role
  const getNavItems = () => {
    const items = [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: Home,
        roles: ["admin", "hr", "manager", "technician", "operator", "engineer"],
      },
      {
        title: "Projects",
        href: "/projects",
        icon: Construction,
        roles: ["admin", "manager", "engineer"],
      },
      {
        title: "Equipment",
        href: "/equipment",
        icon: Truck,
        roles: ["admin", "manager", "technician", "operator", "engineer"],
      },
      {
        title: "Materials & Stock",
        href: "/materials",
        icon: Package,
        roles: ["admin", "manager", "engineer"],
      },
      {
        title: "Incidents",
        href: "/incidents",
        icon: AlertTriangle,
        roles: ["admin", "manager", "technician", "operator", "engineer"],
      },
      {
        title: "Employees",
        href: "/employees",
        icon: Users,
        roles: ["admin", "hr"],
      },
      {
        title: "Financials",
        href: "/financials",
        icon: DollarSign,
        roles: ["admin", "manager"],
      },
      {
        title: "Reports",
        href: "/reports",
        icon: BarChart3,
        roles: ["admin", "hr", "manager"],
      },
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
        roles: ["admin"],
      },
    ]

    // Filter items based on user role
    if (!user) return []
    return items.filter((item) => item.roles.includes(user.role))
  }

  const navItems = getNavItems()

  return (
    <SidebarProvider defaultOpen={open} onOpenChange={setOpen}>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <Construction className="h-6 w-6" />
              <span className="font-bold text-xl">EMS</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}>
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="px-3 py-2">
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start px-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar || ""} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start text-sm">
                          <span className="font-medium">{user.name}</span>
                          <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
                        </div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <div className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  {user && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || ""} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

