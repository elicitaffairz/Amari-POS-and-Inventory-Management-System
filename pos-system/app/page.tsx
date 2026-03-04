"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { LoginForm } from "@/components/login-form"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"
import { POSInterface } from "@/components/pos-interface"
import { InventoryManagement } from "@/components/inventory-management"
import { SalesReports } from "@/components/sales-reports"
import { Settings } from "@/components/settings"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

function AppContent() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [activeView, setActiveView] = useState(() => {
    // Default view based on user role
    if (user?.role === "cashier") return "pos"
    return "dashboard"
  })
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Monitor auth state changes
  useEffect(() => {
    // If user logs out, they'll be redirected by the logout function
    // This effect just ensures the component responds to auth state changes
  }, [user])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading system...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  const getViewTitle = () => {
    switch (activeView) {
      case "pos":
        return { title: "Point of Sale", subtitle: "Select products to add to cart" }
      case "dashboard":
        return { title: "Dashboard", subtitle: "Overview of your store performance" }
      case "inventory":
        return { title: "Inventory Management", subtitle: "Manage your products and stock" }
      case "reports":
        return { title: "Sales Reports", subtitle: "View and analyze your sales data" }
      case "settings":
        return { title: "Settings", subtitle: "Configure your store settings" }
      default:
        return { title: "Dashboard", subtitle: "Overview of your store performance" }
    }
  }

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />
      case "pos":
        return <POSInterface />
      case "inventory":
        return <InventoryManagement />
      case "reports":
        return <SalesReports />
      case "settings":
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  const handleViewChange = (view: string) => {
    setActiveView(view)
    setIsSidebarOpen(false) // Close sidebar on view change in mobile
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header with Menu Toggle */}
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-4">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <Sidebar activeView={activeView} onViewChange={handleViewChange} />
              </SheetContent>
            </Sheet>
            <div>
              <h1 className="text-lg font-bold">{getViewTitle().title}</h1>
              {getViewTitle().subtitle && (
                <p className="text-sm text-muted-foreground">{getViewTitle().subtitle}</p>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto min-h-0">{renderView()}</main>
      </div>
    </div>
  )
}

export default function App() {
  return <AppContent />
}