import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { getItems, addItem, removeCard } from "../../utils/api";

const normalizeItemImage = (item) => ({
	...item,
	imageURL: item.imageURL ?? item.imageUrl ?? item.link ?? "",
	link: item.link ?? item.imageURL ?? item.imageUrl ?? "",
	weather: (item.weather ?? "").toLowerCase(),
});

function App() {
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

	const onAddItem = (inputValues) => {
		addItem({
			name: inputValues.name,
			imageUrl: inputValues.link,
			weather: inputValues.weatherType,
		})
			.then((createdItem) => {
				setClothingItems((prev) => [normalizeItemImage(createdItem), ...prev]);
				closeActiveModal();
			})
			.catch(console.error);
	};

	const deleteItemHandler = (cardId) => {
		if (cardId == null) return;

		removeCard(cardId)
			.then(() => {
				setClothingItems((prev) =>
					prev.filter((item) => (item._id ?? item.id) !== cardId),
				);
				setSelectedCard({});
				closeActiveModal();
			})
			.catch(console.error);
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
			{isWeatherDataLoaded ? (
				<div className="page">
					<div className="page__content">
						<Header handleAddClick={handleAddClick} weatherData={weatherData} />
						<Routes>
							<Route
								path="/"
								element={
									<Main
										weatherData={weatherData}
										handleCardClick={handleCardClick}
										clothingItems={clothingItems}
									/>
								}
							/>
							<Route
								path="/profile"
								element={
									<Profile
										weatherData={weatherData}
										onCardClick={handleCardClick}
										clothingItems={clothingItems}
										handleAddClick={handleAddClick}
									/>
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
				</div>
			) : (
				<div className="page">
					<p>Loading...</p>
				</div>
			)}
		</CurrentTemperatureUnitContext.Provider>
	);
}

export default App;
