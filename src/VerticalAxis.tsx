import * as React from "react";
import { Component } from "react";
import { GraphModel } from "./GraphModel";
import { observer } from "mobx-react";

export interface VerticalAxisProps {
    model: GraphModel;
}

@observer
export class VerticalAxis extends Component<VerticalAxisProps, {}> {
    render() {
        const {model} = this.props;

        let voltLines: number[] = [];
        const roundedZoomY: number = Math.round(model.zoomY);
        const step: number = Math.round(40 / (roundedZoomY === 0 ? 0.5 : roundedZoomY));

        for (let i = step; i <= model.height /  (2 * model.zoomY); i += step) {
                voltLines.push(i);
        }
        return (
            <g>
                <line x1="0" y1="0" x2="0" y2={model.height} style={{stroke: "black", strokeWidth: 2}} />
                {voltLines.map(v => <g key={"lineY" + v} >
                        <line x1="0" x2="5"
                        y1={v * model.zoomY + model.height / 2}
                        y2={v * model.zoomY + model.height / 2} style={{stroke: "black"}} />
                        <text x="6" y={v * model.zoomY + model.height / 2 + 5} >{v / 100 + " V"}</text>

                        <line x1="0" x2="5"
                        y1={-v * model.zoomY + model.height / 2}
                        y2={-v * model.zoomY + model.height / 2} style={{stroke: "black"}} />
                        <text x="6" y={-v * model.zoomY + model.height / 2 + 5} >{v / 100 + " V"}</text>
                    </g>
                )}
            </g>
        );
    }
}