import "./ModalWithForm.css";
import closeButton from "../../assets/closeButton.svg";

function ModalWithForm({
	children,
	buttonText,
	title,
	isOpen,
	onClose,
	onSubmit,
	isSubmitDisabled,
}) {
	return (
		<div className={`modal ${isOpen && "modal_opened"}`}>
			<div className="modal__content">
				<h2 className="modal__title">{title}</h2>
				<button
					onClick={onClose}
					type="button"
					className="modal__close modal__close_type_form"
				>
					<img src={closeButton} alt="Close" />
				</button>
				<form className="modal__form" onSubmit={onSubmit}>
					{children}
					<button
						type="submit"
						className="modal__submit"
						disabled={isSubmitDisabled}
					>
						{buttonText}
					</button>
				</form>
			</div>
		</div>
	);
}

export default ModalWithForm;
