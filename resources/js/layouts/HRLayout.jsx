import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"

export default function HRLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        {/* Top bar */}
        <div className="flex items-center w-full fixed h-12 bg-[#F2F2F2] py-1 border-b px-3">
          <SidebarTrigger />
        </div>

        {/* Main content */}
        <div className="w-full h-full bg-[#E2EDF0] p-5 mt-12">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}