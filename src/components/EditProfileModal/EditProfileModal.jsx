import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ isOpen, onClose, onUpdateProfile, currentUser }) {
	const { values, setValues, handleChange } = useForm({
		name: "",
		avatar: "",
	});

	useEffect(() => {
		if (!isOpen) return;
		setValues({
			name: currentUser?.name ?? "",
			avatar: currentUser?.avatar ?? "",
		});
	}, [isOpen, currentUser, setValues]);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		onUpdateProfile(values).catch(console.error);
	};

	return (
		<ModalWithForm
			title="Change profile data"
			buttonText="Save changes"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			isSubmitDisabled={!values.name || !values.avatar}
		>
			<label className="modal__label" htmlFor="profile-name">
				Name
				<input
					id="profile-name"
					name="name"
					type="text"
					className="modal__input"
					placeholder="Name"
					value={values.name}
					onChange={handleChange}
					required
				/>
			</label>
			<label className="modal__label" htmlFor="profile-avatar">
				Avatar URL
				<input
					id="profile-avatar"
					name="avatar"
					type="url"
					className="modal__input"
					placeholder="Avatar URL"
					value={values.avatar}
					onChange={handleChange}
					required
				/>
			</label>
		</ModalWithForm>
	);
}

export default EditProfileModal;
