import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function DashboardCard({ icon: Icon, value, label }) {
    return (
        <>
            <Card>
                <CardHeader>
                    <div className="text-[#008DEE] bg-[#BDDAEE] p-2 rounded-lg w-fit">
                        <Icon />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-y-3">
                        <span className="text-4xl">{value}</span>
                        <span className="opacity-50">{label}</span>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
