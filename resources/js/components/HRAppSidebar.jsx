import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

import {
    LayoutDashboard,
    UsersRound,
    Clock,
    DollarSign,
    CalendarCheck2,
    FileText,
    Archive,
    Settings,
    LogOut,
} from "lucide-react"

import { Link } from "@inertiajs/react"

import fullLogo from "@/assets/full-logo.svg"

const mainItems = [
    {
        href: "#",
        icon: LayoutDashboard,
        label: "Dashboard",
    },
    {
        href: "#",
        icon: UsersRound,
        label: "Employees",
    },
    {
        href: "#",
        icon: DollarSign,
        label: "Payroll",
    },
    {
        href: "#",
        icon: Clock,
        label: "Timekeeping",
    },
    {
        href: "#",
        icon: FileText,
        label: "Memos",
    },
    {
        href: "#",
        icon: CalendarCheck2,
        label: "Leave Requests",
    },
]

const bottomItems = [
    {
        href: "#",
        icon: Settings,
        label: "Settings",
    },
    {
        href: "#",
        icon: Archive,
        label: "Archive",
    },
]

export function HRAppSidebar() {
    const { state } = useSidebar();

    return (
        <Sidebar collapsible="icon" className="text-[#F2F2F2]">
            <SidebarHeader className="flex items-center justify-center border-b border-[#747474]">
                <img src={fullLogo} alt="Full Logo" />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="border-b border-[#747474]">
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainItems.map((item) => (
                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton asChild 
                                    className="hover:bg-[#30A1EF] hover:text-[#F2F2F2] active:bg-[#5DB1EB] active:text-[#F2F2F2] text-xl py-5">
                                        <Link href={item.href}>
                                            <item.icon />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {bottomItems.map((item) => (
                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton asChild className="text-xl py-5">
                                        <Link href={item.href}>
                                            <item.icon />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t border-[#747474]">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="text-xl py-5">
                            <Link href="/logout" className="flex items-center justify-start gap-2">
                                <LogOut className="w-6 h-6" />
                                <span>Logout</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}