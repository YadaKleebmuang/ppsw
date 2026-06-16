import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderOpen, Layers, Settings, Users } from 'lucide-react';

export const metadata = {
  title: 'Dashboard | Admin',
};

export default function AdminDashboard() {
  const stats = [
    { name: 'Total Projects', value: '4', icon: FolderOpen },
    { name: 'Categories', value: '3', icon: Layers },
    { name: 'Tech Stacks', value: '12', icon: Settings },
    { name: 'Views', value: '1,024', icon: Users },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500">ยินดีต้อนรับสู่ระบบจัดการพอร์ตโฟลิโอ</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">ยังไม่มีความเคลื่อนไหวล่าสุด</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
