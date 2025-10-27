import HRLayout from "@/layouts/HRLayout";

export default function SettingsPage() {
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">SettingsPage</h1>
        </>
    )
}

SettingsPage.layout = page => <HRLayout>{page}</HRLayout>