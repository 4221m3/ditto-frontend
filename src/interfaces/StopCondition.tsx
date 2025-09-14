//#region Stop Condition

export interface StopConditionCounter {
    type: "counter";
    settings: SettingsCounter;
}

export interface StopConditionElem {
    type: "elem_exists" |"elem_null";
    settings: SettingsElem;
}

export interface StopConditionPageBottom {
    type: "page_bottom";
}

//#endregion

//#region Settings

export interface SettingsCounter {
    iterations: number;
}

export interface SettingsElem {
    xpath: string;
    wait: number;
}

//#endregion