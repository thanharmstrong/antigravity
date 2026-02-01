import type { Thruster } from '@/types/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Zap, Thermometer, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

// Manually adding Badge if not installed, or I'll just install it in next step
// Since I haven't installed badge yet, let's use a simple div for now or install it.

interface ThrusterCardProps {
    thruster: Thruster;
    onPowerChange: (id: string, power: number) => void;
}

export const ThrusterCard: React.FC<ThrusterCardProps> = ({ thruster, onPowerChange }) => {
    const getStatusColor = (status: Thruster['status']) => {
        switch (status) {
            case 'online': return 'text-green-400 border-green-400 bg-green-400/10';
            case 'warning': return 'text-yellow-400 border-yellow-400 bg-yellow-400/10';
            case 'critical': return 'text-red-400 border-red-400 bg-red-400/10';
            default: return 'text-slate-400 border-slate-400 bg-slate-400/10';
        }
    };

    return (
        <Card className="glass-panel overflow-hidden transition-all hover:border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Zap className={cn("h-4 w-4", thruster.power > 80 ? "text-yellow-400 animate-pulse" : "text-blue-400")} />
                    {thruster.name}
                </CardTitle>
                <div className={cn("px-2 py-0.5 rounded-full text-[10px] uppercase font-bold border", getStatusColor(thruster.status))}>
                    {thruster.status}
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Thrust Power</span>
                        <span className="font-mono text-white">{thruster.power}%</span>
                    </div>
                    <Slider
                        value={[thruster.power]}
                        max={100}
                        step={1}
                        onValueChange={(val) => onPowerChange(thruster.id, val[0])}
                        className="cursor-pointer"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <Thermometer className="h-3 w-3" />
                            <span>Temp</span>
                        </div>
                        <div className="flex items-end gap-1">
                            <span className="text-lg font-mono">{thruster.temperature}</span>
                            <span className="text-[10px] text-slate-500 mb-1">°C</span>
                        </div>
                        <Progress value={(thruster.temperature / 1500) * 100} className="h-1 bg-slate-800" />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <ShieldAlert className="h-3 w-3" />
                            <span>Stability</span>
                        </div>
                        <div className="flex items-end gap-1">
                            <span className="text-lg font-mono">{thruster.stability}</span>
                            <span className="text-[10px] text-slate-500 mb-1">%</span>
                        </div>
                        <Progress value={thruster.stability} className="h-1 bg-slate-800" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
