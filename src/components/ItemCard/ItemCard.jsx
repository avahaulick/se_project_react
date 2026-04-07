import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
	const currentUser = useContext(CurrentUserContext);

	const handleCardClick = () => {
		onCardClick(item);
	};

	const likes = Array.isArray(item.likes) ? item.likes : [];
	const isLiked = likes.some((like) => {
		const likeId = typeof like === "object" && like !== null ? like._id : like;
		return likeId === currentUser?._id;
	});

	const itemLikeButtonClassName = `card__like-button ${isLiked ? "card__like-button_active" : ""}`;

	const handleLike = (evt) => {
		evt.stopPropagation();
		onCardLike({ id: item._id ?? item.id, isLiked });
	};

	return (
		<li className="card">
			<div className="card__title-row">
				<h2 className="card__name">{item.name}</h2>
				{isLoggedIn && (
					<button
						type="button"
						className={itemLikeButtonClassName}
						onClick={handleLike}
					>
						♥
					</button>
				)}
			</div>
			<img
				onClick={handleCardClick}
				className="card__image"
				src={item.imageURL}
				alt={item.name}
			/>
		</li>
	);
}

export default ItemCard;
