import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({
	clothingItems,
	onCardClick,
	handleAddClick,
}) {
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
				{clothingItems.map((item) => {
					return (
						<ItemCard
							key={item._id ?? item.id}
							item={item}
							onCardClick={onCardClick}
						/>
					);
				})}
			</ul>
		</section>
	);
}
