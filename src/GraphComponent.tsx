import * as React from "react";
import { Component } from "react";
import { GraphModel } from "./GraphModel";
import { observer } from "mobx-react";
import * as d3 from "d3";

export interface GraphComponentProps {
    model: GraphModel;
}

@observer
export class GraphComponent extends Component<GraphComponentProps, {}> {
    getLineFunction(): d3.Line<{x: number, y: number}> {
        return d3.line<[number, number]>()
            .x(function (d) { return d[0]; })
            .y(function (d) { return d[1]; })
            .curve(d3.curveCatmullRom);
        }

    render() {
        const {model} = this.props;

        const lineFnc = this.getLineFunction();
        const points = model.data.map(p => [
        (p.x * (model.width / (2 * Math.PI)) + model.offsetRads * (model.width / (2 * Math.PI))) * model.zoomX + 1,
        -p.y * model.zoomY * (model.height / 4) + ( model.height / 2)]);

        return (
            <g>
                <path d={lineFnc(points)}
                    stroke="black" strokeWidth={5} strokeLinejoin="round" strokeMiterlimit="8"
                    opacity={0.5} fill="none"/>
                {points.map((point, index) =>
                    <circle key={index} r="2.5" fill="black" opacity="0.3" cx={point[0]} cy={point[1]}
                        onMouseOver={e => model.onPointOver(point)}
                        onMouseLeave={e => model.onPointOver([0, model.height / 2])}
                     />
                )}
            </g>
        );
    }
}