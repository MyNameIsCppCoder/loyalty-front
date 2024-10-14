import axios from "axios";

const options = {
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
	baseURL: "http://localhost:8080/api/",
};

// Функция обновления токена
const refreshToken = async () => {
	try {
		const response = await axios.post(
			"http://localhost:8080/api/auth/update-token",
			{},
			options,
		);
		console.log("Token successfully updated");
		localStorage.setItem("accessToken", response.data.accessToken); // Сохраняем новый accessToken
		return response.data.accessToken; // Возвращаем только accessToken
	} catch (error) {
		console.log("Failed to refresh token:", error);
		throw error; // Бросаем ошибку, если не удалось обновить токен
	}
};

export const axiosWithAuth = axios.create(options);

// Интерсептор для каждого запроса
axiosWithAuth.interceptors.request.use(
	(request) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			request.headers.Authorization = `Bearer ${token}`; // Добавляем access token в заголовок
		}
		return request;
	},
	(error) => {
		return Promise.reject(error); // Обрабатываем ошибки запроса
	},
);

// Интерсептор для обработки ошибок (например, если токен истёк)
axiosWithAuth.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const newAccessToken = await refreshToken(); // Обновляем accessToken
				originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`; // Обновляем заголовок с новым токеном
				return axiosWithAuth(originalRequest); // Повторяем оригинальный запрос с обновлённым токеном
			} catch (err) {
				console.error("Session expired. Redirecting to login.");
				//localStorage.removeItem('accessToken'); // Удаляем токен из localStorage
				//window.location.href = '/login'; // Перенаправление на страницу логина
			}
		}
		return Promise.reject(error);
	},
);
