import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';

import BtnView from '../../Buttons/BtnView/BtnView.tsx';

import '@xyflow/react/dist/style.css';

// #region Custom Type Hints

export interface FormData {
  type: 'counter' | 'elem_exists' | 'elem_null' | 'page_bottom';
  settings: SettingsCounter | SettingsElem | {};
}

export interface SettingsCounter {
    iterations: number;
}

export interface SettingsElem {
    xpath: string;
    wait: number;
}

// #endregion

export const NodeSequence = ({ data }: { data: FormData }) => {

    const [stop_type, set_stop_type] = useState(data.type || 'counter');
    const [settings, set_settings] = useState(data.settings || {iterations: 1});

    const handle_action_view = () => {
        // This is where you would handle showing a new Viewport.
        // The logic would depend on your state management,
        // but it would typically involve setting a state variable
        // to render the new Viewport component.
        alert('Viewing sequence details!');
    };

    const handle_action_type_change = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {

        const new_stop_type = event.target.value as "counter" | "elem_exists" | "elem_null" | "page_bottom";
        set_stop_type(new_stop_type);

        switch (new_stop_type) {
            case 'counter':
                set_settings({ iterations: 1});
                break;
            case 'elem_exists':
                set_settings({ xpath: '', wait: 5 });
                break;
            case 'elem_null':
                set_settings({ xpath: '', wait: 5 });
                break;
            case 'page_bottom':
                set_settings({});
                break;
        }

    };

    const handle_settings_field_change = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = event.target;
        let new_value: string | number | boolean = value;

        if (type === 'number') {
            new_value = Number(value);
        } 

        set_settings((prev_settings) => ({
            ...prev_settings,
            [name]: new_value,
        }));
    }

    const render_settings = () => {

        switch (stop_type) {
            case 'counter':
                const settings_counter = settings as SettingsCounter;
                return (
                    <div>
                        <label>Iterations:</label>
                        <input name="iterations" type="text" value={settings_counter.iterations} onChange={handle_settings_field_change} />
                    </div>
                );
            case 'elem_exists':
                const settings_elem_exists = settings as SettingsElem;
                return (
                    <div>
                        <label>XPath:</label>
                        <input name="xpath" type="text" value={settings_elem_exists.xpath} onChange={handle_settings_field_change} />
                        <label>Wait (ms):</label>
                        <input name="wait" type="number" value={settings_elem_exists.wait} onChange={handle_settings_field_change} />
                    </div>
                );
            case 'elem_null':
                const settings_elem_null = settings as SettingsElem;
                return (
                    <div>
                        <label>XPath:</label>
                        <input name="xpath" type="text" value={settings_elem_null.xpath} onChange={handle_settings_field_change} />
                        <label>Wait (ms):</label>
                        <input name="wait" type="number" value={settings_elem_null.wait} onChange={handle_settings_field_change} />
                    </div>
                );
            case 'page_bottom':
                return (
                    <div></div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ padding: '10px', border: '1px solid black', borderRadius: '5px' }}>
            <Handle type="target" position={Position.Left} />
                <div style={{ position: 'absolute', top: 5, right: 5, zIndex: 10 }}>
                    <BtnView
                        on_click={handle_action_view}
                        aria_label="View sequence actions"
                    />
                </div>
                <div>
                    <strong>{stop_type}</strong>
                </div>
                <form>
                <label htmlFor="action-select">Choose an action:</label>
                <select
                    id="action-select"
                    value={stop_type}
                    onChange={handle_action_type_change}
                    style={{ marginLeft: '10px' }}
                >
                    <option value="counter">Counter</option>
                    <option value="elem_exists">Element Appears</option>
                    <option value="elem_null">Element Disappears</option>
                    <option value="page_bottom">Bottom Reached</option>
                </select>

                <hr />
                {render_settings()}
                
                </form>
            
            {/* Handles are for connecting nodes */}
            <Handle type="source" position={Position.Right} />
        </div>
    );
};