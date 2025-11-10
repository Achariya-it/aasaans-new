import StatsCard from '../StatsCard';
import { Award, BookOpen, FileCheck, Trophy } from 'lucide-react';

export default function StatsCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <StatsCard
        title="Total Skill Points"
        value="1,250"
        icon={Award}
        trend={{ value: "+150 this month", isPositive: true }}
      />
      <StatsCard
        title="Courses Completed"
        value="12"
        icon={BookOpen}
        trend={{ value: "+3 this month", isPositive: true }}
      />
      <StatsCard
        title="Certificates Earned"
        value="12"
        icon={FileCheck}
      />
      <StatsCard
        title="Global Rank"
        value="#245"
        icon={Trophy}
        trend={{ value: "+15 positions", isPositive: true }}
      />
    </div>
  );
}
