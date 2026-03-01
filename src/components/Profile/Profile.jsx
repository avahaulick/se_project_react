import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

export default function Profile({
	clothingItems,
	onCardClick,
	handleAddClick,
}) {
	return (
		<section className="profile">
			<SideBar />
			<div className="profile__content">
				<ClothesSection
					clothingItems={clothingItems}
					onCardClick={onCardClick}
					handleAddClick={handleAddClick}
				/>
			</div>
		</section>
	);
}
