import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { HRAppSidebar } from "@/components/HRAppSidebar"

export default function HRLayout({ children }) {
  return (
    <SidebarProvider>
      <HRAppSidebar />
      <main className="w-full bg-E2EDF0">
        {/* Top bar */}
        <div className="w-full bg-[#F2F2F2] py-1 border-b">
          <SidebarTrigger />
        </div>

        {/* Main content */}
        {children}
      </main>
    </SidebarProvider>
  )
}