import { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, onDelete }) {
	const currentUser = useContext(CurrentUserContext);
	const isOwn = (card?.owner ?? "") === currentUser?._id;

	return (
		<div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
			<div className="modal__content modal__content_type_image">
				<button
					onClick={onClose}
					type="button"
					className="modal__close"
				></button>
				<img
					src={card.imageURL || card.link}
					alt={card.name}
					className="modal__image"
				/>
				<div className="modal__footer">
					<div className="modal__info">
						<h2 className="modal__caption">{card.name}</h2>
						<p className="modal__weather">Weather: {card.weather}</p>
					</div>
					{isOwn && (
						<button
							onClick={() => onDelete(card._id ?? card.id)}
							type="button"
							className="modal__delete-btn"
						>
							Delete item
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default ItemModal;
