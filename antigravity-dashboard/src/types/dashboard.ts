export type ThrusterStatus = 'online' | 'offline' | 'warning' | 'critical';

export interface Thruster {
    id: string;
    name: string;
    power: number; // 0 to 100
    stability: number; // 0 to 100
    temperature: number; // in Celsius
    status: ThrusterStatus;
    axialRotation: number; // 0 to 360
}

export interface DashboardStats {
    totalThrust: number;
    altitudeDesired: number;
    altitudeCurrent: number;
    gravityCancellation: number; // 0 to 100%
    batteryLevel: number;
}

export interface SystemEvent {
    id: string;
    timestamp: Date;
    message: string;
    type: 'info' | 'warning' | 'error';
}
