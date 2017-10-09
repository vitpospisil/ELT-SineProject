import * as React from 'react';
import { Component } from 'react';
import { observer } from 'mobx-react';
import { GraphModel } from './GraphModel';

export interface CoordinatesProps {
    model: GraphModel;
}

@observer
export class Coordinates extends Component<CoordinatesProps, {}> {
    render() {
        const {model} = this.props;
        const y = -(model.mouseY - model.height/2)/100;
        return (
            <div style={{marginTop: -30, textAlign: "right", width: "100%"}} >
                <span style={{paddingRight: 10}} >
                    {`X: ${model.mouseX? model.mouseX / model.zoomX >> 0 : 0} ms`}
                </span>
                <span>
                    {`Y: ${y? (y / model.zoomY).toFixed(2): 0} V`}
                </span>
            </div>
        );
    }
}