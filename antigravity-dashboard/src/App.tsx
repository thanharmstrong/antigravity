import { useState, useCallback } from 'react';
import type { Thruster, DashboardStats, SystemEvent } from './types/dashboard';
import { ThrusterCard } from './components/ThrusterCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Rocket,
  Battery,
  Map,
  Activity,
  AlertTriangle,
  Info,
  Navigation,
  Globe
} from 'lucide-react';
import { useInterval } from './hooks/useInterval';
import { cn } from '@/lib/utils';

const INITIAL_THRUSTERS: Thruster[] = [
  { id: 't1', name: 'Alpha Core-1', power: 45, stability: 98, temperature: 420, status: 'online', axialRotation: 0 },
  { id: 't2', name: 'Alpha Core-2', power: 45, stability: 97, temperature: 415, status: 'online', axialRotation: 0 },
  { id: 't3', name: 'Beta Wing-L', power: 60, stability: 92, temperature: 510, status: 'online', axialRotation: 15 },
  { id: 't4', name: 'Beta Wing-R', power: 60, stability: 91, temperature: 515, status: 'online', axialRotation: 345 },
];

const INITIAL_STATS: DashboardStats = {
  totalThrust: 210,
  altitudeDesired: 12500,
  altitudeCurrent: 12485,
  gravityCancellation: 99.2,
  batteryLevel: 84
};

export default function App() {
  const [thrusters, setThrusters] = useState<Thruster[]>(INITIAL_THRUSTERS);
  const [stats, setStats] = useState<DashboardStats>(INITIAL_STATS);
  const [events, setEvents] = useState<SystemEvent[]>([]);

  // Simulation logic
  useInterval(() => {
    setThrusters(prev => prev.map(t => ({
      ...t,
      stability: Math.max(70, Math.min(100, t.stability + (Math.random() - 0.5) * 2)),
      temperature: Math.max(300, Math.min(1200, t.temperature + (t.power / 10) + (Math.random() - 0.5) * 10)),
      status: t.stability < 80 ? 'warning' : t.stability < 75 ? 'critical' : 'online'
    })));

    setStats(prev => ({
      ...prev,
      altitudeCurrent: prev.altitudeCurrent + (Math.random() - 0.5) * 5,
      batteryLevel: Math.max(0, prev.batteryLevel - 0.01)
    }));
  }, 2000);

  const handlePowerChange = useCallback((id: string, power: number) => {
    setThrusters(prev => prev.map(t => t.id === id ? { ...t, power } : t));

    // Log event
    const newEvent: SystemEvent = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      message: `Thruster ${id} power adjusted to ${power}%`,
      type: 'info'
    };
    setEvents(prev => [newEvent, ...prev].slice(0, 20));
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-50 font-sans selection:bg-blue-500/30">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Rocket className="h-8 w-8 text-blue-500" />
              <div className="absolute -inset-1 animate-pulse rounded-full bg-blue-500/20 blur-sm"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">Antigravity V-1</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-500">Suborbital Thruster Management</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] uppercase text-slate-500">System Status</span>
              <span className="text-sm font-medium text-green-400">NOMINAL OPERATION</span>
            </div>
            <div className="h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-slate-800">
              <div className="flex h-full w-full items-center justify-center bg-blue-500/10">
                <Globe className="h-5 w-5 text-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">

          {/* Main Controls & Stats */}
          <div className="lg:col-span-3 space-y-6">

            {/* Essential Metrics */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card className="glass-panel glow-primary">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs font-medium text-slate-400 uppercase tracking-wider">Altitude</CardTitle>
                  <Navigation className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-mono font-bold">{stats.altitudeCurrent.toFixed(1)}m</div>
                  <p className="text-[10px] text-slate-500 mt-1">Target: {stats.altitudeDesired}m</p>
                  <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-1000"
                      style={{ width: `${(stats.altitudeCurrent / stats.altitudeDesired) * 100}%` }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs font-medium text-slate-400 uppercase tracking-wider">Cancellation</CardTitle>
                  <Activity className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-mono font-bold">{stats.gravityCancellation}%</div>
                  <p className="text-[10px] text-slate-500 mt-1">Stability Flux: ±0.02%</p>
                  <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 transition-all duration-1000"
                      style={{ width: `${stats.gravityCancellation}%` }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs font-medium text-slate-400 uppercase tracking-wider">Battery</CardTitle>
                  <Battery className={cn("h-4 w-4", stats.batteryLevel < 20 ? "text-red-500" : "text-green-400")} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-mono font-bold">{stats.batteryLevel.toFixed(1)}%</div>
                  <p className="text-[10px] text-slate-500 mt-1">Discharge Rate: 0.12%/m</p>
                  <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full transition-all duration-1000", stats.batteryLevel < 20 ? "bg-red-500" : "bg-green-500")}
                      style={{ width: `${stats.batteryLevel}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Thruster Grid */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-white">
                  <Map className="h-5 w-5 text-blue-500" />
                  Thruster Matrix
                </h2>
                <span className="text-xs text-slate-500">{thrusters.length} Units Active</span>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {thrusters.map(thruster => (
                  <ThrusterCard
                    key={thruster.id}
                    thruster={thruster}
                    onPowerChange={handlePowerChange}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar / Event Log */}
          <div className="space-y-6">
            <Card className="glass-panel h-full min-h-[400px]">
              <CardHeader>
                <CardTitle className="text-xs font-semibold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Activity className="h-3 w-3" />
                  System Telemetry
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px] px-4">
                  <div className="space-y-4 pb-4">
                    {events.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-10 text-slate-600">
                        <Info className="h-8 w-8 mb-2 opacity-20" />
                        <span className="text-xs">Awaiting telemetry sensor data...</span>
                      </div>
                    )}
                    {events.map((event) => (
                      <div key={event.id} className="group relative pl-4 border-l border-slate-800">
                        <div className={cn(
                          "absolute -left-[1.5px] top-1 h-2 w-2 rounded-full",
                          event.type === 'info' ? "bg-blue-500" : "bg-yellow-500"
                        )} />
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-mono text-slate-500">
                            {event.timestamp.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                          </span>
                          {event.type === 'warning' && <AlertTriangle className="h-3 w-3 text-yellow-500" />}
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          {event.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="fixed bottom-0 z-50 w-full border-t border-white/5 bg-black/80 backdrop-blur-md px-4 py-2">
        <div className="container mx-auto flex items-center justify-between text-[10px] font-mono text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
              GPS: LOCKED [45.5231, -122.6765]
            </span>
            <span>VELOCITY: 0.00 m/s</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="animate-pulse">CRYPTOGRAPHIC LINK: ENCRYPTED</span>
            <span>Uptime: 00:42:15</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
