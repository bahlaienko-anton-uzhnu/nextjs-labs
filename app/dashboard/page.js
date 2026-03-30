import StatsCard from "@/components/StatsCard";
import { getBookStats } from "@/lib/helpers";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  const stats = getBookStats();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Огляд</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Книг у бібліотеці" value={stats.total} color="amber" />
        <StatsCard title="В наявності" value={stats.available} color="green" />
        <StatsCard title="Середня ціна" value={`${stats.avgPrice} грн`} color="blue" />
      </div>
    </div>
  );
}