import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import {
	getItems,
	addItem,
	removeCard,
	addCardLike,
	removeCardLike,
	updateUserProfile,
} from "../../utils/api";
import { register, authorize, checkToken } from "../../utils/auth";

const normalizeItemImage = (item) => ({
	...item,
	imageURL: item.imageURL ?? item.imageUrl ?? item.link ?? "",
	link: item.link ?? item.imageURL ?? item.imageUrl ?? "",
	weather: (item.weather ?? "").toLowerCase(),
	likes: Array.isArray(item.likes) ? item.likes : [],
	owner:
		typeof item.owner === "object" && item.owner !== null
			? item.owner._id
			: item.owner,
});

function App() {
	const navigate = useNavigate();
	const [weatherData, setWeatherData] = useState({
		type: "",
		city: "",
		temp: { F: 75, C: 75 },
		condition: "",
		isDay: false,
	});
	const [activeModal, setActiveModal] = useState("");
	const [selectedCard, setSelectedCard] = useState({});
	const [clothingItems, setClothingItems] = useState([]);
	const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
	const [isWeatherDataLoaded, setIsWeatherDataLoaded] = useState(false);
	const [currentUser, setCurrentUser] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleToggleSwitchChange = () => {
		setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
	};

	const handleCardClick = (card) => {
		setActiveModal("preview");
		setSelectedCard(card);
	};

	const handleAddClick = () => {
		setActiveModal("add-garment");
	};

	const handleRegisterClick = () => {
		setActiveModal("register");
	};

	const handleLoginClick = () => {
		setActiveModal("login");
	};

	const handleEditProfileClick = () => {
		setActiveModal("edit-profile");
	};

	const onAddItem = (inputValues) => {
		const token = localStorage.getItem("jwt");
		if (!token) return Promise.reject(new Error("No auth token"));

		return addItem({
			name: inputValues.name,
			imageUrl: inputValues.link,
			weather: inputValues.weatherType,
		}, token)
			.then((createdItem) => {
				setClothingItems((prev) => [normalizeItemImage(createdItem), ...prev]);
				closeActiveModal();
			})
			.catch((err) => {
				console.error(err);
				throw err;
			});
	};

	const deleteItemHandler = (cardId) => {
		if (cardId == null) return;
		const token = localStorage.getItem("jwt");
		if (!token) return;

		removeCard(cardId, token)
			.then(() => {
				setClothingItems((prev) =>
					prev.filter((item) => (item._id ?? item.id) !== cardId),
				);
				setSelectedCard({});
				closeActiveModal();
			})
			.catch(console.error);
	};

	const handleCardLike = ({ id, isLiked }) => {
		const token = localStorage.getItem("jwt");
		if (!token) return;

		const likeRequest = !isLiked ? addCardLike(id, token) : removeCardLike(id, token);

		likeRequest
			.then((updatedCard) => {
				const normalizedCard = normalizeItemImage(updatedCard);
				setClothingItems((items) =>
					items.map((item) =>
						(item._id ?? item.id) === id ? normalizedCard : item,
					),
				);
			})
			.catch(console.error);
	};

	const handleRegister = (userData) => {
		return register(userData)
			.then(() => authorize({ email: userData.email, password: userData.password }))
			.then((res) => {
				if (!res.token) {
					return Promise.reject(new Error("Token was not returned"));
				}

				localStorage.setItem("jwt", res.token);
				return checkToken(res.token);
			})
			.then((user) => {
				setCurrentUser(user);
				setIsLoggedIn(true);
				closeActiveModal();
			})
			.catch((err) => {
				console.error(err);
				throw err;
			});
	};

	const handleLogin = (credentials) => {
		return authorize(credentials)
			.then((res) => {
				if (!res.token) {
					return Promise.reject(new Error("Token was not returned"));
				}

				localStorage.setItem("jwt", res.token);
				return checkToken(res.token);
			})
			.then((user) => {
				setCurrentUser(user);
				setIsLoggedIn(true);
				closeActiveModal();
			})
			.catch((err) => {
				console.error(err);
				throw err;
			});
	};

	const handleUpdateProfile = (profileData) => {
		const token = localStorage.getItem("jwt");
		if (!token) {
			return Promise.reject(new Error("No auth token"));
		}

		return updateUserProfile(profileData, token)
			.then((updatedUser) => {
				setCurrentUser(updatedUser);
				closeActiveModal();
			})
			.catch((err) => {
				console.error(err);
				throw err;
			});
	};

	const handleSignOut = () => {
		localStorage.removeItem("jwt");
		setIsLoggedIn(false);
		setCurrentUser({});
		navigate("/");
	};

	const closeActiveModal = () => {
		setActiveModal("");
	};

	useEffect(() => {
		getWeather(coordinates, APIkey)
			.then((data) => {
				const filteredData = filterWeatherData(data);
				setWeatherData(filteredData);
				setIsWeatherDataLoaded(true);
			})
			.catch(console.error);

		getItems()
			.then((data) => {
				setClothingItems(data.map(normalizeItemImage));
			})
			.catch(console.error);
	}, []);

	useEffect(() => {
		const token = localStorage.getItem("jwt");
		if (!token) return;

		checkToken(token)
			.then((user) => {
				setCurrentUser(user);
				setIsLoggedIn(true);
			})
			.catch(() => {
				localStorage.removeItem("jwt");
				setIsLoggedIn(false);
				setCurrentUser({});
			});
	}, []);

	useEffect(() => {
		if (!activeModal) return; // stop the effect not to add the listener if there is no active modal

		const handleEscClose = (e) => {
			// define the function inside useEffect not to lose the reference on rerendering
			if (e.key === "Escape") {
				closeActiveModal();
			}
		};

		document.addEventListener("keydown", handleEscClose);

		return () => {
			// don't forget to add a clean up function for removing the listener
			document.removeEventListener("keydown", handleEscClose);
		};
	}, [activeModal]); // watch activeModal here

	return (
		<CurrentTemperatureUnitContext.Provider
			value={{ currentTemperatureUnit, handleToggleSwitchChange }}
		>
			<CurrentUserContext.Provider value={currentUser}>
				{isWeatherDataLoaded ? (
					<div className="page">
						<h1 className="page__title">What to Wear</h1>
						<div className="page__content">
							<Header
								handleAddClick={handleAddClick}
								handleRegisterClick={handleRegisterClick}
								handleLoginClick={handleLoginClick}
								weatherData={weatherData}
								isLoggedIn={isLoggedIn}
							/>
							<Routes>
								<Route
									path="/"
									element={
										<Main
											weatherData={weatherData}
											handleCardClick={handleCardClick}
											clothingItems={clothingItems}
											onCardLike={handleCardLike}
											isLoggedIn={isLoggedIn}
										/>
									}
								/>
								<Route
									path="/profile"
									element={
										<ProtectedRoute isLoggedIn={isLoggedIn}>
											<Profile
												onCardClick={handleCardClick}
												clothingItems={clothingItems}
												handleAddClick={handleAddClick}
												handleEditProfileClick={handleEditProfileClick}
												handleSignOut={handleSignOut}
												onCardLike={handleCardLike}
												isLoggedIn={isLoggedIn}
											/>
										</ProtectedRoute>
									}
								/>
							</Routes>
							<Footer />
						</div>
						<AddItemModal
							isOpen={activeModal === "add-garment"}
							onClose={closeActiveModal}
							onAddItem={onAddItem}
						/>
						<ItemModal
							activeModal={activeModal}
							card={selectedCard}
							onClose={closeActiveModal}
							onDelete={deleteItemHandler}
						/>
						<RegisterModal
							isOpen={activeModal === "register"}
							onClose={closeActiveModal}
							onRegister={handleRegister}
							onSwitchToLogin={handleLoginClick}
						/>
						<LoginModal
							isOpen={activeModal === "login"}
							onClose={closeActiveModal}
							onLogin={handleLogin}
							onSwitchToRegister={handleRegisterClick}
						/>
						<EditProfileModal
							isOpen={activeModal === "edit-profile"}
							onClose={closeActiveModal}
							onUpdateProfile={handleUpdateProfile}
							currentUser={currentUser}
						/>
					</div>
				) : (
					<div className="page">
						<h1 className="page__title">What to Wear</h1>
						<p>Loading...</p>
					</div>
				)}
			</CurrentUserContext.Provider>
		</CurrentTemperatureUnitContext.Provider>
	);
}

export default App;
