import DashboardNav from "@/components/DashboardNav";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-[calc(100vh-120px)]">
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <DashboardNav />
      </aside>

      <main className="flex-1 bg-gray-100 p-8">
        {children}
      </main>
    </div>
  );
}