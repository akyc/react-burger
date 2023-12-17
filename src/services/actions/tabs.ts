export const SELECT_TABS : 'SELECT_TABS' = 'SELECT_TABS';

export interface ISelectTab{
    readonly type: typeof SELECT_TABS,
    readonly payload : string
}


export type TTabsAction = ISelectTab

export const selectTab = (payload: string): ISelectTab => ({
    type: SELECT_TABS,
    payload
})

