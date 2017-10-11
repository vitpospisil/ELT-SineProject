import * as React from "react";
import { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import { GraphModel } from "./GraphModel";
import { GraphComponent } from "./GraphComponent";
import { HorizontalAxis } from "./HorizontalAxis";
import { VerticalAxis } from "./VerticalAxis";
import { Coordinates } from "./CoordinatesComponent";

export interface GraphContainerProps {
    model: GraphModel;
}

@observer
export class GraphContainer extends Component<GraphContainerProps, {}> {
    render() {
        const {model} = this.props;

        return(
            // viewbox x = počet period * 2PI, y = 10 (jako 10 V) * zoom
            <div style={{position: "relative"}} >
                <svg viewBox={`0 0 ${model.width} ${model.height + 5}`}>
                    <GraphComponent model={model} />
                    <HorizontalAxis model={model} />
                    <VerticalAxis model={model} />
                </svg>
                <Coordinates model={model} />
            </div>
        );
    }
}