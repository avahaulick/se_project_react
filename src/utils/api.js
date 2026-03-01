const baseUrl = "http://localhost:3001";

const headers = {
	"Content-Type": "application/json",
};

const handleServerResponse = (res) => {
	return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () =>
	fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);

export const addItem = ({ name, imageUrl, weather }) =>
	fetch(`${baseUrl}/items`, {
		method: "POST",
		headers,
		body: JSON.stringify({
			name,
			weather,
			imageUrl,
		}),
	}).then(handleServerResponse);

export const removeCard = (itemID) =>
	fetch(`${baseUrl}/items/${itemID}`, {
		method: "DELETE",
		headers,
	}).then(handleServerResponse);
