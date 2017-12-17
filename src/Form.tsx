import * as React from 'react';
import { Component } from 'react';
import { Model, OhmPrefixes, FaradPrefixes } from './Model';

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
            case "F":
                return 1;
            case "mF":
                return 1/1000;
            case "μF":
                return 1/1000000;
            case "nF":
                return 1/1000000000;
        }
    }

    render() {
        return (
            <div className="form">
                <input id="res" type="input" placeholder="resistence" />
                <select id="resUnit" name="RUnit">
                    {Object.keys(OhmPrefixes).filter(p => !Number(p) ).map(p => 
                        <option key={p} value={p} >{p.valueOf()}</option>
                    )}
                </select>
                <input id="cap" type="input" placeholder="capacity" />
                <select id="capUnit" name="RUnit">
                    {Object.keys(FaradPrefixes).filter(p => !Number(p) ).map(p => 
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