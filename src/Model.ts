import { action, observable } from "mobx";

export class Model {
    @observable chargingPoints: Point[] = [];
    @observable dischargingPoints: Point[] = [];
    tau: number = 0;

    @action.bound createPoints(resistance: number, resUnit: number, inductivity: number, indUnit: number) {
        this.chargingPoints = [];
        this.dischargingPoints = [];
        this.tau = inductivity * indUnit / (resistance * resUnit);
        // Zobrazení 6× Tau zaohrohlený nahoru s přesností na 0,01
        const maxTime = 6 * (((this.tau * 100) >> 0) + 1) / 100;
        for (var x = 0; x <= maxTime; x += maxTime / 1000) {
            const y = Math.pow(Math.E, -x/this.tau);
            this.chargingPoints.push(new Point(x, y));
            this.dischargingPoints.push(new Point(x, - y));
        }
    }
}

export enum OhmPrefixes {
    MΩ,
    KΩ,
    Ω, 
    mΩ
}

export enum HenryPrefixes {
    H,
    mH, 
    μH,
    nH,
    pH
}

export class Point {
    constructor(public x: number, public y: number) { }
}