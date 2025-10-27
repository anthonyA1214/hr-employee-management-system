import HRLayout from '@/layouts/HRLayout'

export default function ArchivePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">ArchivePage</h1>
      <p>Welcome to the ArchivePage!</p>
    </div>
  )
}

ArchivePage.layout = page => <HRLayout>{page}</HRLayout>