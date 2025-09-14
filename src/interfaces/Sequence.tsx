
import type{
    ActionClick,
    ActionFill,
    ActionScrape,
    ActionScroll
} from '../interfaces/Action.tsx'

import type{
    StopConditionCounter,
    StopConditionElem,
    StopConditionPageBottom,
} from '../interfaces/StopCondition.tsx'

export interface Sequence {
    id: string,
    name: string,
    desc: string,
    actions: ActionClick[] | ActionFill[] | ActionScrape[] | ActionScroll[],
    stop_condition: StopConditionCounter | StopConditionElem | StopConditionPageBottom,
    next_id: string,
    first: boolean
}
