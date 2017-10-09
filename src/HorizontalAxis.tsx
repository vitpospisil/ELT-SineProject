import * as React from 'react';
import { Component } from 'react';
import { GraphModel } from './GraphModel';
import { observer } from 'mobx-react';

export interface HorizontalAxisProps {
    model: GraphModel;
}

@observer
export class HorizontalAxis extends Component<HorizontalAxisProps, {}> {
    render() {
        const {model} = this.props;

        let timeLines: number[] = [];
        const roundedZoomX: number = Math.round(model.zoomX);

        for(let i = Math.round(100 / (roundedZoomX === 0? 0.5 : roundedZoomX));
            i <= model.width / model.zoomX;
            i += Math.round(100 / (roundedZoomX === 0? 0.5 : roundedZoomX))) {
                timeLines.push(i);
        }

        return (
            <g>
                <line x1="0" y1={model.height / 2} x2={model.width} y2={model.height / 2} style={{stroke: "black", strokeWidth: 1}} />
                {timeLines.map(t => <g key={"lineX"+t} >
                        <line x1={model.zoomX * t} y1={model.height / 2 - 5} x2={model.zoomX * t} y2={model.height / 2 + 5} style={{stroke: "black"}} />
                        <text x={model.zoomX * t + 2} y={model.height / 2 + 15} >{t + " ms"}</text>
                    </g>
                )}
            </g>
        );
    }
}