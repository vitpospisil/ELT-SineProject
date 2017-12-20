import * as React from 'react';
import { Component } from 'react';
import LineChart from "react-linechart";
import { Point, Model } from './Model';
import { observer } from "mobx-react";

export interface ChartsProps {
    model: Model;
}

@observer
export class Charts extends Component<ChartsProps, {}> {
    render(){
        console.log(this.props.model);
        const {model} = this.props;
        return (
            <div>
                <LineChart 
                    width={1024}
                    height={600}
                    margins= {{ top: 50, right: 200, bottom: 60, left: 55 }}	
                    hidePoints={true}
                    yLabel="Napětí [× 100%]"
                    xLabel="Čas [ms]"
                    showLegends={true}
                    legendPosition="bottom-right"
                    xParser={(data)=> (data * 1000)}
                    data={[
                        {			
                            name: "Napětí na cívce při sepnutí obvodu",						
                            color: "steelblue", 
                            points: model.chargingPoints 
                        },
                        {					
                            name: "Napětí na cívce při rozepnutí obvodu",				
                            color: "red", 
                            points: model.dischargingPoints 
                        }]                        
                    }
                />
                <span>Hodnota 1 tau: {(1 / Math.E) * 100} %, {model.tau * 3000} ms</span> <br />
                <span>Hodnota 3 tau: {Math.pow(Math.E, -3) * 100} %, {model.tau * 3000} ms</span> <br />
                <span>Hodnota 5 tau: {Math.pow(Math.E, -5) * 100} %, {model.tau * 5000} ms</span>

            </div>
        )
    }
}