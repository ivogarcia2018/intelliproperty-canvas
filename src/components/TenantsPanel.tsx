import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface TenantsPanelProps {
  totalMembers: number;
  tenants?: Array<{ name: string; avatar?: string }>;
}

const TenantsPanel = ({ totalMembers, tenants = [] }: TenantsPanelProps) => {
  const percentage = Math.min((totalMembers / 10000) * 100, 100);

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg mb-4">Tenants</h3>
      
      <p className="text-sm text-muted-foreground mb-4">
        Join our growing community of active members.
      </p>

      {tenants.length > 0 && (
        <div className="flex -space-x-2 mb-6">
          {tenants.slice(0, 3).map((tenant, index) => (
            <Avatar key={index} className="border-2 border-card w-10 h-10">
              <AvatarImage src={tenant.avatar} />
              <AvatarFallback>{tenant.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      )}

      <div className="relative">
        <div className="flex items-center justify-center mb-2">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="hsl(var(--chart-1))"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentage / 100)}`}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold">{(totalMembers / 1000).toFixed(1)}k</p>
              <p className="text-xs text-muted-foreground">members</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TenantsPanel;