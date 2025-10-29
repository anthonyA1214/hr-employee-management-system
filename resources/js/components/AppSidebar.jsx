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
} from "@/components/ui/sidebar"

import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"

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

import { Link, usePage, Form } from "@inertiajs/react"

import fullLogo from "@/assets/full-logo.svg"

const mainItems = [
    {
        href: "/hr/dashboard",
        icon: LayoutDashboard,
        label: "Dashboard",
    },
    {
        href: "/hr/employees",
        icon: UsersRound,
        label: "Employees",
    },
    {
        href: "/hr/payroll",
        icon: DollarSign,
        label: "Payroll",
    },
    {
        href: "/hr/timekeeping",
        icon: Clock,
        label: "Timekeeping",
    },
    {
        href: "/hr/memos",
        icon: FileText,
        label: "Memos",
    },
    {
        href: "/hr/leave-requests",
        icon: CalendarCheck2,
        label: "Leave Requests",
    },
]

const bottomItems = [
    {
        href: "/hr/settings",
        icon: Settings,
        label: "Settings",
    },
    {
        href: "/hr/archive",
        icon: Archive,
        label: "Archive",
    },
]

export function AppSidebar() {
    const { url } = usePage();

    return (
        <Sidebar collapsible="icon" className="text-[#F2F2F2]">
            <SidebarHeader className="flex items-center justify-center">
                <img src={fullLogo} alt="Full Logo" />
            </SidebarHeader>
            <SidebarContent>
                <Separator className="my-4 bg-[#747474]" />

                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainItems.map((item) => {
                                const isActive = url.startsWith(item.href);
                                return (
                                    <SidebarMenuItem key={item.label}>
                                        <SidebarMenuButton asChild 
                                        className={`${isActive ? 'bg-[#018CEF] hover:bg-[#018CEF] hover:text-[#F2F2F2] active:bg-[#018CEF] active:text-[#F2F2F2]' : 'hover:bg-[#30A1EF] hover:text-[#F2F2F2] active:bg-[#5DB1EB] active:text-[#F2F2F2]'} text-xl py-5`}>
                                            <Link href={item.href}>
                                                <item.icon />
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <Separator className="my-4 bg-[#747474]" />

                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {bottomItems.map((item) => {
                                const isActive = url.startsWith(item.href);
                                return (
                                    <SidebarMenuItem key={item.label}>
                                        <SidebarMenuButton asChild 
                                        className={`${isActive ? 'bg-[#018CEF] hover:bg-[#018CEF] hover:text-[#F2F2F2] active:bg-[#018CEF] active:text-[#F2F2F2]' : 'hover:bg-[#30A1EF] hover:text-[#F2F2F2] active:bg-[#5DB1EB] active:text-[#F2F2F2]'} text-xl py-5`}>
                                            <Link href={item.href}>
                                                <item.icon />
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <Separator className="my-4 bg-[#747474]" />
            
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Form action="/logout" method="POST" className="text-xl">
                            {({ processing }) => (
                                <SidebarMenuButton asChild className="hover:bg-[#30A1EF] hover:text-[#F2F2F2] active:bg-[#5DB1EB] active:text-[#F2F2F2] text-xl py-5">   
                                    <button type="submit" disabled={processing} className="w-full">
                                        {processing ? (
                                            <>
                                                <LogOut />
                                                <span>Logging out</span>
                                                <Spinner className="ms-auto" />
                                            </>
                                        ) : (
                                            <>
                                                <LogOut />
                                                <span>Log out</span>
                                            </>
                                        )}
                                    </button>
                                </SidebarMenuButton>
                            )}
                        </Form>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}