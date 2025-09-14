import type {
    ActionClick,
    ActionFill,
    ActionScrape,
    ActionScroll,
} from '../interfaces/Action.tsx'

export const add_action = async (
    auth_token: string,
    job_id: string,
    sequence_id: string,
    action: ActionClick | ActionFill | ActionScrape | ActionScroll,
) => {

    try {

        const base_url = "http://localhost:8000";
        const endpoint = `/jobs/${job_id}/sequences/${sequence_id}/actions`;

        const response = await fetch(
            `${base_url}${endpoint}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${auth_token}`
                },
                body: JSON.stringify(action),
            }
        );

        const response_json = await response.json();

        if (!response.ok) {
            throw new Error(response_json.details);
        } else {
            return response_json;
        }

    } catch (error) {
        console.error(error);
    }
}

export const del_action = async (
    auth_token: string,
    job_id: string,
    sequence_id: string,
    action_id: string,
) => {
    try {

        const base_url = "http://localhost:8000";
        const endpoint = `/jobs/${job_id}/sequences/${sequence_id}/actions/${action_id}/`;

        const response = await fetch(
            `${base_url}${endpoint}}`,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${auth_token}`
                },
            }
        
        );
        
        const response_json = await response.json();

        if (!response.ok) {
            throw new Error(response_json.details);
        } else {
            return response_json;
        }

    } catch (error) {
        console.error(error);
    }
}