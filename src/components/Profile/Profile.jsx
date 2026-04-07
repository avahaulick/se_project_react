import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

export default function Profile({
	clothingItems,
	onCardClick,
	handleAddClick,
	handleEditProfileClick,
	handleSignOut,
	onCardLike,
	isLoggedIn,
}) {
	return (
		<section className="profile">
			<SideBar
				onEditProfile={handleEditProfileClick}
				onSignOut={handleSignOut}
			/>
			<div className="profile__content">
				<ClothesSection
					clothingItems={clothingItems}
					onCardClick={onCardClick}
					handleAddClick={handleAddClick}
					onCardLike={onCardLike}
					isLoggedIn={isLoggedIn}
				/>
			</div>
		</section>
	);
}
