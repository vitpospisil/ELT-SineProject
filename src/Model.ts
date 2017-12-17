import { action, observable } from "mobx";

export class Model {
    @observable chargingPoints: Point[] = [];
    @observable dischargingPoints: Point[] = [];
    tau: number = 0;
    threeTau: number = 0;
    fiveTau:number = 0;

    @action.bound createPoints(resistance: number, resUnit: number, capacity: number, capUnit: number) {
        this.chargingPoints = [];
        this.dischargingPoints = [];
        this.tau = resistance * resUnit * capacity * capUnit;
        this.threeTau = 1 - Math.pow(Math.E, -3*this.tau/this.tau);
        this.fiveTau = 1 - Math.pow(Math.E, -5*this.tau/this.tau);
        // Zobrazení 6× Tau zaohrohlený nahoru s přesností na 0,01
        const maxTime = 6 * (((this.tau * 100) >> 0) + 1) / 100;
        for (var x = 0; x <= maxTime; x += maxTime / 200) {
            const y = Math.pow(Math.E, -x/this.tau);
            this.chargingPoints.push(new Point(x, 1 - y));
            this.dischargingPoints.push(new Point(x, y));
        }
    }
}

export enum OhmPrefixes {
    "MΩ" = 10 ** 6,
    "KΩ" = 10 ** 3,
    "Ω" = 1,
    "mΩ" = 10 ** -3,
}

export enum FaradPrefixes {
    F = 1,
    mF = 10 ** -3, 
    μF = 10 ** -6,
    nF = 10 ** -9,
    pF = 10 ** -12
}

export class Point {
    constructor(public x: number, public y: number) { }
}