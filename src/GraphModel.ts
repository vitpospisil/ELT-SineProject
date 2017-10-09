import { observable, action } from 'mobx';

export class GraphModel{
    @observable data: {x:number, y:number}[] = [];
    @observable frequency: number = 5;
    @observable periods: number = 3;
    @observable offsetRads: number = 0;
    @observable offsetDegrees: number = 0;
    @observable zoomX: number = 1;
    @observable zoomY: number = 1;
    @observable amplitude: number = 1;
    @observable limit: number;
    @observable mouseX: number;
    @observable mouseY: number;
    width: number = 1000;
    height: number = 400;
    constructor(){
        this.limit = 100;
        this.createSineData();
    }

    getY(x: number){
        return this.amplitude * Math.sin(x * this.frequency);
    }

    createSineData(){
        this.data = [];
        const maxNum = this.periods * 2 * Math.PI / this.frequency - this.offsetRads;
        const step = (maxNum + this.offsetRads) / this.limit;
        console.log("maxNum", maxNum, step, -this.offsetRads);
        for(let i = -this.offsetRads; i < maxNum; i += step){
            this.data.push({x: i, y: this.getY(i)});
        }
    }

    @action.bound setFrequency(e: React.ChangeEvent<HTMLInputElement>) {
        this.frequency = Number(e.target.value);
        this.frequency && this.createSineData();
    }

    @action.bound setOffsetInRads(e: React.ChangeEvent<HTMLInputElement>) {
        this.offsetRads = Number(e.target.value);
        this.offsetDegrees = Number(e.target.value)*(180/Math.PI);
        this.offsetRads && this.createSineData();
    }
    @action.bound setOffsetInDegrees(e: React.ChangeEvent<HTMLInputElement>) {
        this.offsetRads = (Number(e.target.value) / (180/Math.PI));
        this.offsetDegrees = Number(e.target.value);
        this.offsetRads && this.createSineData();
    }

    @action.bound setPeriods(e: React.ChangeEvent<HTMLInputElement>) {
        this.periods = Number(e.target.value);
        this.periods && this.createSineData();
    }

    @action.bound setZoomX(e: React.ChangeEvent<HTMLInputElement>) {
        this.zoomX = Number(e.target.value);
    }

    @action.bound setZoomY(e: React.ChangeEvent<HTMLInputElement>) {
        this.zoomY = Number(e.target.value);
    }

    @action.bound setAmplitude(e: React.ChangeEvent<HTMLInputElement>) {
        this.amplitude = Number(e.target.value);
        this.amplitude && this.createSineData();
    }

    @action.bound setNumberOfPoints(e: React.ChangeEvent<HTMLInputElement>) {
        this.limit = Number(e.target.value);
        this.limit &&this.createSineData();
    }

    @action.bound onPointOver(point: number[]) {
        this.mouseX = point[0];
        this.mouseY = point[1];
    }
}