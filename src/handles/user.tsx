export const login = async (form_data: URLSearchParams) => {

    try {

        const base_url = "http://localhost:8000";
        const endpoint = `/token/`;

        const response = await fetch(
            `${base_url}${endpoint}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: form_data.toString(),
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

};