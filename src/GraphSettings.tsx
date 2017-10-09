import * as React from 'react';
import { Component } from 'react';
import { observer } from 'mobx-react';
import { GraphModel } from "./GraphModel";

export interface GraphSettingsProps{
    model: GraphModel;
}

@observer
export class GraphSettings extends Component<GraphSettingsProps, {}> {
    render(){
        const { model } = this.props;
        return(
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label>Number of periods:</label>
                        </td>
                        <td>
                            <input type="number" value={model.periods} onChange={model.setPeriods} />
                        </td>
                        <td>
                            <label>Frequency [Hz]:</label>
                        </td>
                        <td>
                            <input type="number" value={model.frequency} onChange={model.setFrequency} />
                        </td>
                        <td>
                            <label>Offset [rads]:</label>
                        </td>
                        <td>
                            <input type="number" value={model.offsetRads} onChange={model.setOffsetInRads} />
                        </td>
                        <td>
                            <label>Offset [degrees]:</label>
                        </td>
                        <td>
                            <input type="number" value={model.offsetDegrees} 
                                onChange={model.setOffsetInDegrees} />
                        </td>
                    </tr>
                    
                    <tr>
                        <td>
                            <label>Amplitude [V]:</label>
                        </td>
                        <td>
                            <input type="number" value={model.amplitude} onChange={model.setAmplitude} step={0.5} min={0} />
                        </td>
                        <td>
                            <label>Zoom X:</label>
                        </td>
                        <td>
                            <input type="number" value={model.zoomX} onChange={model.setZoomX} step={0.2} min={0.2} />
                        </td>
                        <td>
                            <label>Zoom Y:</label>
                        </td>
                        <td>
                            <input type="number" value={model.zoomY} onChange={model.setZoomY} step={0.2} min={0.2} />
                        </td>
                        <td>
                            <label>Number of points:</label>
                        </td>
                        <td>
                            <input type="number" value={model.limit} onChange={model.setNumberOfPoints} step={10} min={1} />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}