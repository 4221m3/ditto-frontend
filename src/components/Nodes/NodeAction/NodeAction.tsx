import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

// #region Custom Type Hints

export interface FormData {
  type: 'click' | 'fill' | 'scroll' | 'scrape';
  settings: SettingsClick | SettingsFill | SettingsScrape | SettingsScroll;
}

export interface SettingsClick {
    xpath: string;
    wait: number;
    clicks: number;
}

export interface SettingsFill {
    xpath: string;
    wait: number;
    payload: string;
}

export interface SettingsScrape {
    name: string,
    path: string,
    attr: string,
    concat: boolean,
}

export interface SettingsScroll {
    x_dist: number;
    y_dist: number;
    count: number;
}

// #endregion

export const NodeAction = ({ data }: { data: FormData }) => {

    const [action_type, set_action_type] = useState(data.type || 'click');
    const [settings, set_settings] = useState(data.settings || {xpath: '', wait: 5, clicks: 1});


    const handle_action_type_change = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {

        const new_action_type = event.target.value as "click" | "fill" | "scroll" | "scrape"
        set_action_type(new_action_type);

        switch (new_action_type) {
            case 'click':
                set_settings({ xpath: '', wait: 5, clicks: 1 });
                break;
            case 'fill':
                set_settings({ xpath: '', wait: 5, payload: 'test' });
                break;
            case 'scroll':
                set_settings({ x_dist: 100, y_dist: 100, count: 1 });
                break;
            case 'scrape':
                set_settings({ name: 'Column 1', path: '', attr: 'text', concat: false });
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

        } else if (type === 'checkbox') {
            new_value = (event.target as HTMLInputElement).checked;
        }

        set_settings((prev_settings) => ({
            ...prev_settings,
            [name]: new_value,
        }));
    }

    const render_settings = () => {

        switch (action_type) {
            case 'click':
                const click_settings = settings as SettingsClick;
                return (
                    <div>
                        <label>XPath:</label>
                        <input name="xpath" type="text" value={click_settings.xpath} onChange={handle_settings_field_change} />
                        <label>Wait (ms):</label>
                        <input name="wait" type="number" value={click_settings.wait} onChange={handle_settings_field_change} />
                        <label>Clicks:</label>
                        <input name="clicks" type="number" value={click_settings.clicks} onChange={handle_settings_field_change} />
                    </div>
                );
            case 'fill':
                const fill_settings = settings as SettingsFill;
                return (
                    <div>
                        <label>XPath:</label>
                        <input name="xpath" type="text" value={fill_settings.xpath} onChange={handle_settings_field_change} />
                        <label>Wait (ms):</label>
                        <input name="wait" type="number" value={fill_settings.wait} onChange={handle_settings_field_change} />
                        <label>Payload:</label>
                        <input name="payload" type="text" value={fill_settings.payload} onChange={handle_settings_field_change} />
                    </div>
                );
            case 'scroll':
                const scroll_settings = settings as SettingsScroll;
                return (
                    <div>
                        <label>X Distance:</label>
                        <input name="x_dist" type="number" value={scroll_settings.x_dist} onChange={handle_settings_field_change} />
                        <label>Y Distance:</label>
                        <input name="y_dist" type="number" value={scroll_settings.y_dist} onChange={handle_settings_field_change} />
                        <label>Count:</label>
                        <input name="count" type="number" value={scroll_settings.count} onChange={handle_settings_field_change} />
                    </div>
                );
            case 'scrape':
                const scrape_settings = settings as SettingsScrape;
                return (
                    <div>
                        <label>Name:</label>
                        <input name="name" type="text" value={scrape_settings.name} onChange={handle_settings_field_change} />
                        <label>Path:</label>
                        <input name="path" type="text" value={scrape_settings.path} onChange={handle_settings_field_change} />
                        <label>Attr:</label>
                        <input name="attr" type="text" value={scrape_settings.attr} onChange={handle_settings_field_change} />
                        <label>Concat:</label>
                        <input name="concat" type="checkbox" checked={scrape_settings.concat} onChange={handle_settings_field_change} />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ padding: '10px', border: '1px solid black', borderRadius: '5px' }}>
            <Handle type="target" position={Position.Left} />
                <div>
                <strong>{action_type}</strong>
                </div>
                <form>
                <label htmlFor="action-select">Choose an action:</label>
                <select
                    id="action-select"
                    value={action_type}
                    onChange={handle_action_type_change}
                    style={{ marginLeft: '10px' }}
                >
                    <option value="click">Click</option>
                    <option value="fill">Fill</option>
                    <option value="scroll">Scroll</option>
                    <option value="scrape">Scrape</option>
                </select>

                <hr />
                {render_settings()}
                
                </form>
            
            {/* Handles are for connecting nodes */}
            <Handle type="source" position={Position.Right} />
        </div>
    );
};