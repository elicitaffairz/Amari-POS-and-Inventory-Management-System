"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Home,
  BookOpen,
  ShoppingCart,
  Package,
  BarChart3,
  Settings,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Info,
  AlertTriangle,
  ArrowRight,
  Search,
  LogIn,
  LogOut,
  Users,
  Printer,
  QrCode,
  Download,
  Eye,
  Shield,
  Hand,
  ClipboardList,
  TrendingUp,
  DollarSign,
  Clock,
  Layout,
  Monitor,
  User,
  ChevronRight,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

/** Simple screenshot placeholder – one label, no bullet list */
function ScreenshotPlaceholder({ id, caption }: { id: string; caption: string }) {
  return (
    <div className="my-6">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4">
        <div className="bg-gray-700 rounded-lg aspect-video flex items-center justify-center text-gray-400 relative">
          <div className="absolute inset-4 border-2 border-dashed border-gray-600 rounded flex items-center justify-center">
            <div className="text-center px-4">
              <div className="text-3xl mb-1">📸</div>
              <p className="font-semibold text-sm">{id}</p>
              <p className="text-xs mt-1 text-gray-500">{caption}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** 5-step interaction flow diagram (User → Input → System → Output → Feedback) */
function FlowDiagram({
  steps,
}: {
  steps: [string, string, string, string, string]
}) {
  const colors = [
    "from-violet-500 to-purple-600",   // User
    "from-blue-500 to-cyan-600",       // Input
    "from-emerald-500 to-green-600",   // System
    "from-amber-500 to-orange-600",    // Output
    "from-rose-500 to-pink-600",       // Feedback
  ]
  const labels = ["User", "Input", "System", "Output", "Feedback"]

  return (
    <div className="my-6 bg-white/80 backdrop-blur rounded-xl border border-purple-200 shadow-sm p-5">
      <h4 className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-4 flex items-center gap-1.5">
        <ArrowRight className="w-3.5 h-3.5" /> Interaction Flow
      </h4>
      <div className="flex flex-col sm:flex-row items-stretch gap-2">
        {steps.map((text, i) => (
          <div key={i} className="flex-1 flex flex-col items-center text-center">
            <div
              className={`w-full rounded-lg bg-gradient-to-br ${colors[i]} text-white px-3 py-3 text-xs font-medium leading-snug flex-1 flex items-center justify-center min-h-[60px]`}
            >
              {text}
            </div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mt-1.5">
              {labels[i]}
            </span>
            {i < 4 && (
              <ChevronRight className="w-4 h-4 text-gray-300 hidden sm:block absolute" style={{ display: "none" }} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionHeading({ icon: Icon, title }: { icon: React.ComponentType<{ className?: string }>; title: string }) {
  return (
    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
        <Icon className="w-5 h-5 text-purple-600" />
      </div>
      {title}
    </h3>
  )
}

function Callout({ type, children }: { type: "info" | "success" | "warning" | "error"; children: React.ReactNode }) {
  const styles = {
    info: "bg-blue-50 border-blue-500 text-blue-800",
    success: "bg-green-50 border-green-500 text-green-800",
    warning: "bg-yellow-50 border-yellow-500 text-yellow-800",
    error: "bg-red-50 border-red-500 text-red-800",
  }
  const icons = {
    info: <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />,
    success: <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />,
    error: <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />,
  }
  return (
    <div className={`border-l-4 p-4 rounded my-4 ${styles[type]}`}>
      <div className="flex items-start gap-2">
        {icons[type]}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

/** Compact bullet list */
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 my-3">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                    */
/* ------------------------------------------------------------------ */

export default function UserManualPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview", icon: BookOpen },
    { id: "pos", label: "POS", icon: ShoppingCart },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "more", label: "More", icon: AlertCircle },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100">
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">User Manual</h1>
                <p className="text-xs text-gray-500">Amari POS & Inventory Management System</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2">
                <Home className="w-4 h-4" /> Back to App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Tab Bar ────────────────────────────────────────────── */}
      <nav className="bg-white border-b sticky top-20 z-30 hide-scrollbar overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  active
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </nav>

      {/* ── Content ────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
        {/* ===== OVERVIEW ===== */}
        {activeTab === "overview" && (
          <section className="space-y-10">
            <div className="text-center max-w-3xl mx-auto mb-4">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Welcome to Amari POS</h2>
              <p className="text-gray-600">
                A streamlined point-of-sale and inventory management system for Amari Homemade &amp; Pastries.
                This guide walks you through every feature — from logging in to generating reports.
              </p>
            </div>

            {/* System at a Glance */}
            <SectionHeading icon={Layout} title="System at a Glance" />
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: Monitor, title: "Dashboard", desc: "Real-time sales, revenue & low-stock alerts" },
                { icon: ShoppingCart, title: "Point of Sale", desc: "Search products, build cart, complete transactions" },
                { icon: Package, title: "Inventory", desc: "Track stock levels, costs & ingredients" },
                { icon: BarChart3, title: "Reports", desc: "Daily/weekly/monthly analytics & export" },
                { icon: Settings, title: "Settings", desc: "Users, roles, tax, receipts & appearance" },
                { icon: BookOpen, title: "User Manual", desc: "This guide — accessible from the login page" },
              ].map((card, i) => {
                const CIcon = card.icon
                return (
                  <div key={i} className="bg-white rounded-xl p-5 shadow-sm border flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <CIcon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{card.title}</p>
                      <p className="text-sm text-gray-500">{card.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Logging In */}
            <SectionHeading icon={LogIn} title="Logging In" />
            <p className="text-gray-700 text-sm">
              Open the app to reach the <strong>Login</strong> screen. Enter your staff credentials and press <strong>Sign In</strong>.
              The system validates your account and routes you to the <strong>Dashboard</strong>.
            </p>
            <FlowDiagram
              steps={[
                "Staff opens app",
                "Enters email & password",
                "Credentials verified",
                "Dashboard loads",
                "Welcome toast shown",
              ]}
            />
            <ScreenshotPlaceholder id="SCR-01" caption="Login screen with email & password fields" />

            <Callout type="info">
              Forgot your password? Contact your administrator — only the <em>Owner</em> role can reset passwords.
            </Callout>

            {/* Navigation */}
            <SectionHeading icon={Hand} title="Navigating the Sidebar" />
            <BulletList
              items={[
                "The left sidebar lists all modules: Dashboard, POS, Inventory, Reports, Settings.",
                "Click any item to switch views — the active page is highlighted in purple.",
                "The Logout button sits at the bottom of the sidebar.",
              ]}
            />
            <ScreenshotPlaceholder id="SCR-02" caption="Sidebar navigation with active state highlighted" />
          </section>
        )}

        {/* ===== POS ===== */}
        {activeTab === "pos" && (
          <section className="space-y-10">
            <SectionHeading icon={ShoppingCart} title="Point of Sale" />

            <p className="text-gray-700 text-sm">
              The POS screen lets cashiers search the product catalogue, add items to a cart, and complete sales — all in a single view.
            </p>

            {/* Searching & Adding Products */}
            <h4 className="font-bold text-lg text-gray-900 mt-6">Searching &amp; Adding Products</h4>
            <BulletList
              items={[
                "Type a product name in the search bar; results filter in real-time.",
                "Click a product card (or tap +) to add one unit to the cart.",
                "Use the quantity stepper in the cart to increase or decrease units.",
              ]}
            />
            <FlowDiagram
              steps={[
                "Cashier types product name",
                "Search bar filters catalogue",
                "Matching products displayed",
                "Selected item added to cart",
                "Cart total updates instantly",
              ]}
            />
            <ScreenshotPlaceholder id="SCR-03" caption="POS screen — product grid & active cart" />

            {/* Completing a Sale */}
            <h4 className="font-bold text-lg text-gray-900 mt-8">Completing a Sale</h4>
            <BulletList
              items={[
                "Review the cart — adjust quantities or remove items as needed.",
                "Press Complete Sale to finalise the transaction.",
                "The system deducts stock and records the sale in the database.",
                "A receipt is generated and can be printed.",
              ]}
            />
            <FlowDiagram
              steps={[
                "Cashier reviews cart",
                "Presses 'Complete Sale'",
                "Stock deducted & sale saved",
                "Receipt generated",
                "Success notification shown",
              ]}
            />
            <ScreenshotPlaceholder id="SCR-04" caption="Cart summary with Complete Sale button" />

            <Callout type="success">
              Receipts can be reprinted from the <strong>Reports → Transaction History</strong> section.
            </Callout>

            {/* Scanning */}
            <h4 className="font-bold text-lg text-gray-900 mt-8">Barcode / QR Scanning</h4>
            <BulletList
              items={[
                "Click the QR icon on the POS toolbar to open the scanner.",
                "Point the device camera at the product barcode.",
                "The item is instantly added to the cart on successful scan.",
              ]}
            />
            <FlowDiagram
              steps={[
                "Cashier opens scanner",
                "Scans product barcode",
                "Code matched to product",
                "Item added to cart",
                "Beep + visual confirmation",
              ]}
            />
          </section>
        )}

        {/* ===== INVENTORY ===== */}
        {activeTab === "inventory" && (
          <section className="space-y-10">
            <SectionHeading icon={Package} title="Inventory Management" />

            <p className="text-gray-700 text-sm">
              Track every product and ingredient. The inventory module provides two tabs — <strong>Products</strong> and <strong>Ingredients</strong> —
              with tools to add, edit, and monitor stock levels.
            </p>

            {/* Products Tab */}
            <h4 className="font-bold text-lg text-gray-900 mt-6">Products</h4>
            <BulletList
              items={[
                "View all products in a searchable, sortable table.",
                "Each row shows name, category, price, stock quantity, and status.",
                "Click Add Product to open the creation form; fill in name, price, category, and initial stock.",
                "Click Edit (pencil icon) to modify an existing product's details.",
                "Click Delete (trash icon) to remove a product — a confirmation dialog appears first.",
              ]}
            />
            <FlowDiagram
              steps={[
                "Manager opens Inventory",
                "Clicks 'Add Product'",
                "Fills form & submits",
                "Product saved to database",
                "Table refreshes with new row",
              ]}
            />
            <ScreenshotPlaceholder id="SCR-05" caption="Inventory products table with Add / Edit / Delete actions" />

            {/* Ingredients Tab */}
            <h4 className="font-bold text-lg text-gray-900 mt-8">Ingredients</h4>
            <BulletList
              items={[
                "Switch to the Ingredients tab to manage raw materials.",
                "Add ingredients with name, unit, unit cost, and stock quantity.",
                "Low-stock ingredients are flagged with a warning badge.",
              ]}
            />
            <FlowDiagram
              steps={[
                "Manager selects Ingredients tab",
                "Clicks 'Add Ingredient'",
                "Enters details & saves",
                "Ingredient row appears",
                "Low-stock badge if below threshold",
              ]}
            />
            <ScreenshotPlaceholder id="SCR-06" caption="Ingredients table with low-stock warnings" />

            <Callout type="warning">
              When stock falls below the configured threshold, the Dashboard shows an alert and the item row turns amber.
            </Callout>
          </section>
        )}

        {/* ===== REPORTS ===== */}
        {activeTab === "reports" && (
          <section className="space-y-10">
            <SectionHeading icon={BarChart3} title="Sales Reports" />

            <p className="text-gray-700 text-sm">
              View revenue trends, transaction history, and product performance across custom date ranges.
            </p>

            {/* Overview Cards */}
            <h4 className="font-bold text-lg text-gray-900 mt-6">Summary Cards</h4>
            <BulletList
              items={[
                "Total Revenue — cumulative sales for the selected period.",
                "Total Transactions — number of completed sales.",
                "Average Order Value — revenue ÷ transactions.",
                "Top Product — best-selling item by quantity.",
              ]}
            />
            <FlowDiagram
              steps={[
                "Manager opens Reports",
                "Selects date range",
                "System queries sales data",
                "Summary cards & charts render",
                "Data reflects chosen period",
              ]}
            />
            <ScreenshotPlaceholder id="SCR-07" caption="Reports dashboard — summary cards & revenue chart" />

            {/* Transaction History */}
            <h4 className="font-bold text-lg text-gray-900 mt-8">Transaction History</h4>
            <BulletList
              items={[
                "A detailed table lists every transaction with date, items, total, and cashier.",
                "Click any row to expand and view the individual line items.",
                "Use the date filter to narrow results.",
              ]}
            />

            {/* Export */}
            <h4 className="font-bold text-lg text-gray-900 mt-8">Exporting Data</h4>
            <BulletList
              items={[
                "Click the Export button (download icon) above any table.",
                "Choose CSV or PDF format.",
                "The file downloads immediately for offline use or printing.",
              ]}
            />
            <FlowDiagram
              steps={[
                "Manager clicks Export",
                "Selects format (CSV / PDF)",
                "System compiles data",
                "File downloads to device",
                "Confirmation toast shown",
              ]}
            />
            <ScreenshotPlaceholder id="SCR-08" caption="Export dialog with format options" />
          </section>
        )}

        {/* ===== SETTINGS ===== */}
        {activeTab === "settings" && (
          <section className="space-y-10">
            <SectionHeading icon={Settings} title="Settings" />

            <p className="text-gray-700 text-sm">
              Configure users, roles, tax rates, receipt layout, and the system's visual appearance.
            </p>

            {/* User Management */}
            <h4 className="font-bold text-lg text-gray-900 mt-6">User Management</h4>
            <BulletList
              items={[
                "Owners can add, edit, or deactivate staff accounts.",
                "Each user is assigned a role: Owner, Manager, or Cashier.",
                "Roles determine which modules and actions are accessible.",
              ]}
            />
            <FlowDiagram
              steps={[
                "Owner opens Settings → Users",
                "Clicks 'Add User'",
                "Fills details & assigns role",
                "Account created in database",
                "New user appears in table",
              ]}
            />
            <ScreenshotPlaceholder id="SCR-09" caption="User management table with role badges" />

            {/* Tax & Receipt */}
            <h4 className="font-bold text-lg text-gray-900 mt-8">Tax &amp; Receipt Configuration</h4>
            <BulletList
              items={[
                "Set the tax rate percentage — applied automatically at checkout.",
                "Customise receipt header & footer text (e.g., shop name, return policy).",
                "Toggle whether receipts print automatically after each sale.",
              ]}
            />

            {/* Appearance */}
            <h4 className="font-bold text-lg text-gray-900 mt-8">Appearance</h4>
            <BulletList
              items={[
                "Switch between Light and Dark mode from the appearance toggle.",
                "The theme persists across sessions via local storage.",
              ]}
            />

            <Callout type="info">
              Only the <strong>Owner</strong> role can manage users and change tax/receipt settings. Cashiers have read-only access to Settings.
            </Callout>
          </section>
        )}

        {/* ===== MORE ===== */}
        {activeTab === "more" && (
          <section className="space-y-10">
            <SectionHeading icon={AlertCircle} title="Troubleshooting & FAQ" />

            {/* Common Issues */}
            <h4 className="font-bold text-lg text-gray-900 mt-6">Common Issues</h4>
            <div className="space-y-4">
              {[
                {
                  q: "I can't log in.",
                  a: "Double-check your email and password. If locked out, ask the Owner to reset your account.",
                },
                {
                  q: "Stock numbers look wrong after a sale.",
                  a: "Stock is deducted automatically. If a sale was voided, the stock should reverse. Contact support if discrepancies persist.",
                },
                {
                  q: "Reports show no data.",
                  a: "Ensure the selected date range contains transactions. Try expanding the range or selecting 'All Time'.",
                },
                {
                  q: "The barcode scanner isn't working.",
                  a: "Grant camera permissions in your browser settings and ensure the device has a working camera.",
                },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm border">
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-purple-600" /> {item.q}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 ml-6">{item.a}</p>
                </div>
              ))}
            </div>

            {/* Keyboard Shortcuts */}
            <h4 className="font-bold text-lg text-gray-900 mt-8">Keyboard Shortcuts</h4>
            <div className="bg-white rounded-xl p-5 shadow-sm border">
              <div className="grid sm:grid-cols-2 gap-y-2 gap-x-8 text-sm">
                {[
                  ["Ctrl + K", "Open search"],
                  ["Ctrl + P", "Print receipt"],
                  ["Esc", "Close dialog / modal"],
                  ["Tab", "Move to next field"],
                ].map(([key, action], i) => (
                  <div key={i} className="flex items-center gap-3">
                    <kbd className="px-2 py-0.5 rounded bg-gray-100 border text-xs font-mono text-gray-700">{key}</kbd>
                    <span className="text-gray-600">{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Logging Out */}
            <SectionHeading icon={LogOut} title="Logging Out" />
            <BulletList
              items={[
                "Click Logout at the bottom of the sidebar.",
                "The system ends your session and returns to the login screen.",
                "Always log out on shared devices to protect your account.",
              ]}
            />

            <FlowDiagram
              steps={[
                "User clicks Logout",
                "Confirmation prompt",
                "Session terminated",
                "Redirect to Login",
                "Logged-out toast shown",
              ]}
            />

            <ScreenshotPlaceholder id="SCR-10" caption="Logout button on the sidebar" />
          </section>
        )}
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="bg-white border-t mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          <p className="font-medium text-gray-700 mb-1">Amari Homemade &amp; Pastries — POS &amp; Inventory System</p>
          <p>User Manual • Version 1.0 • Last updated March 2, 2026</p>
        </div>
      </footer>

      {/* ── Utility Styles ─────────────────────────────────────── */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
