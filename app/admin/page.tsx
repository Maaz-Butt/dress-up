import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata = {
  title: "Admin Dashboard | Dress Up",
  description: "Manage your fashion store inventory and products.",
};

export default function AdminPage() {
  return (
    <div className="max-w-[1600px] mx-auto min-h-screen">
      <div className="px-4 py-12 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-black uppercase tracking-tighter">
              Control <span className="text-neutral-500">Center</span>
            </h1>
            <p className="text-sm text-neutral-500 font-medium">
              Storefront Oversight & Digital Asset Management
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Live System Status
          </div>
        </div>

        <AdminDashboard />
      </div>
    </div>
  );
}
