import * as React from 'react';
import { Component } from 'react';
import { Model, OhmPrefixes, HenryPrefixes } from './Model';

export interface FormProps {
   submit: (res: number, resUnit: number, cap: number, capUnit: number) => void;
}

export class Form extends Component<FormProps, {}> {

    findOhmUnit(text: string): number {
        switch(text) {
            case "MΩ":
                return 1000000;
            case "KΩ":
                return 1000;
            case "Ω":
                return 1;
            case "mΩ":
                return 1/1000;
        }
    }

    findFaradUnit(text: string): number {
        switch(text) {
            case "H":
                return 1;
            case "mH":
                return 1/1000;
            case "μH":
                return 1/1000000;
            case "nH":
                return 1/1000000000;
        }
    }

    render() {
        return (
            <div className="form">
                <input id="res" type="input" placeholder="resistence" />
                <select id="resUnit" name="RUnit">
                    {Object.keys(OhmPrefixes).filter(p => !Number(p) && p != "0").map(p => 
                        <option key={p} value={p} >{p.valueOf()}</option>
                    )}
                </select>
                <input id="cap" type="input" placeholder="inductivity" />
                <select id="capUnit" name="RUnit">
                    {Object.keys(HenryPrefixes).filter(p => !Number(p) && p != "0").map(p => 
                        <option key={p} value={p} >{p.valueOf()}</option>
                    )}
                </select>
                <input type="button" value="Zpracovat" onClick={() => this.props.submit(
                    Number((document.getElementById("res") as any).value),
                    this.findOhmUnit((document.getElementById("resUnit") as any).value),
                    Number((document.getElementById("cap") as any).value),
                    this.findFaradUnit((document.getElementById("capUnit") as any).value)
                )} />
            </div>
        );
    }
} 