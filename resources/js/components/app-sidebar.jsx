import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    useSidebar,
} from "@/components/ui/sidebar"

import {
    LayoutDashboard,
    Clock,
    DollarSign,
    CalendarCheck2,
    FileText,
    Archive,
    Settings,
    LogOut,
} from "lucide-react"

import fullLogo from "@/assets/full-logo.svg"

export function AppSidebar() {
    const { state } = useSidebar();

    return (
        <Sidebar collapsible="icon" >
            <SidebarHeader className="flex items-center justify-center">
                <img src={fullLogo} alt="Full Logo" />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}