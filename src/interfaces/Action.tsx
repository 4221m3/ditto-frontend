//#region Actions

export interface ActionClick {
    id: string,
    type: "click",
    settings: SettingsClick,
    next_id: string,
    first: boolean
}

export interface ActionFill {
    id: string,
    type: "fill",
    settings: SettingsFill,
    next_id: string,
    first: boolean
}

export interface ActionScrape {
    id: string,
    type: "scrape",
    settings: SettingsScrape,
    next_id: string,
    first: boolean
}

export interface ActionScroll {
    id: string,
    type: "scroll",
    settings: SettingsScroll,
    next_id: string,
    first: boolean
}

//#endregion

//#region Settings

export interface SettingsClick {
    xpath: string,
    wait: number,
    clicks: number
}

export interface SettingsFill {
    xpath: string,
    wait: number,
    payload: number
}

export interface SettingsScrape {
    name: string,
    path: string,
    attr: string,
    concat: boolean
}

export interface SettingsScroll {
    x_dist: number,
    y_dist: number,
    count: number,
}

//#endregion