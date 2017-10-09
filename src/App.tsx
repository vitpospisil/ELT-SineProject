import * as React from 'react';
import { Component } from 'react';
import { GraphSettings } from "./GraphSettings";
import { GraphModel } from "./GraphModel";
import { GraphContainer } from "./GraphContainer";

export class App extends Component<{},{}> {
    graphModel: GraphModel = new GraphModel();
    render(){
        return (
            <div id="container">
                <GraphSettings model={this.graphModel} />
                <div className="line" />
                <GraphContainer model={this.graphModel} />
            </div>
        );
    }
}