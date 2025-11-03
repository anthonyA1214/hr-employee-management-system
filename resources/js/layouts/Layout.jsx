import { usePage } from "@inertiajs/react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HRLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <SidebarProvider>
            <AppSidebar user={user} />
            <main className="w-full bg-[#E2EDF0]">
                {/* Top bar */}
                <div className="flex justify-between items-center w-full sticky top-0 h-12 bg-[#F2F2F2] py-1 border-b px-3">
                    <SidebarTrigger />
                    <div className="flex items-center gap-x-3">
                        <Avatar>
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <p className="text-sm font-medium">
                                {user.first_name} {user.last_name}
                            </p>
                            <p className="text-xs opacity-50">
                                {user.role === "hr" ? "HR" : "Employee"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="w-full p-8">{children}</div>
            </main>
        </SidebarProvider>
    );
}
