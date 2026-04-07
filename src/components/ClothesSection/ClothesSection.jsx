import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function ClothesSection({
	clothingItems,
	onCardClick,
	handleAddClick,
	onCardLike,
	isLoggedIn,
}) {
	const currentUser = useContext(CurrentUserContext);
	const userItems = clothingItems.filter((item) => {
		return item.owner === currentUser?._id;
	});

	return (
		<section className="clothes-section">
			<div className="clothes-section__header">
				<p className="clothes-section__title">Your items</p>
				<button
					type="button"
					onClick={handleAddClick}
					className="clothes-section__add-btn"
				>
					+ Add new
				</button>
			</div>
			<ul className="clothes-section__items">
				{userItems.map((item) => {
					return (
						<ItemCard
							key={item._id ?? item.id}
							item={item}
							onCardClick={onCardClick}
							onCardLike={onCardLike}
							isLoggedIn={isLoggedIn}
						/>
					);
				})}
			</ul>
		</section>
	);
}
