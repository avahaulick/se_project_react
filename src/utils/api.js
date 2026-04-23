const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.twighlightparadox.mooo.com"
    : "http://localhost:3001";

const getHeaders = (token) => {
	const headers = {
		"Content-Type": "application/json",
	};

	if (token) {
		headers.authorization = `Bearer ${token}`;
	}

	return headers;
};

export const handleServerResponse = (res) => {
	return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () =>
	fetch(`${baseUrl}/items`, { headers: getHeaders() }).then(handleServerResponse);

export const addItem = ({ name, imageUrl, weather }, token) =>
	fetch(`${baseUrl}/items`, {
		method: "POST",
		headers: getHeaders(token),
		body: JSON.stringify({
			name,
			weather,
			imageUrl,
		}),
	}).then(handleServerResponse);

export const removeCard = (itemID, token) =>
	fetch(`${baseUrl}/items/${itemID}`, {
		method: "DELETE",
		headers: getHeaders(token),
	}).then(handleServerResponse);

export const addCardLike = (itemID, token) =>
	fetch(`${baseUrl}/items/${itemID}/likes`, {
		method: "PUT",
		headers: getHeaders(token),
	}).then(handleServerResponse);

export const removeCardLike = (itemID, token) =>
	fetch(`${baseUrl}/items/${itemID}/likes`, {
		method: "DELETE",
		headers: getHeaders(token),
	}).then(handleServerResponse);

export const updateUserProfile = ({ name, avatar }, token) =>
	fetch(`${baseUrl}/users/me`, {
		method: "PATCH",
		headers: getHeaders(token),
		body: JSON.stringify({ name, avatar }),
	}).then(handleServerResponse);
