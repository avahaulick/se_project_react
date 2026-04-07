import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({
	isOpen,
	onClose,
	onRegister,
	onSwitchToLogin,
	isLoading,
	errorMessage,
}) {
	const { values, setValues, handleChange } = useForm({
		name: "",
		avatar: "",
		email: "",
		password: "",
	});

	const handleSubmit = (evt) => {
		evt.preventDefault();
		onRegister(values)
			.then(() => {
				setValues({ name: "", avatar: "", email: "", password: "" });
			})
			.catch(console.error);
	};

	return (
		<ModalWithForm
			title="Sign up"
			buttonText={isLoading ? "Creating account..." : "Next"}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			isSubmitDisabled={
				isLoading ||
				!values.name ||
				!values.avatar ||
				!values.email ||
				!values.password
			}
		>
			<label className="modal__label" htmlFor="register-email">
				Email
				<input
					id="register-email"
					name="email"
					type="email"
					className="modal__input"
					placeholder="Email"
					value={values.email}
					onChange={handleChange}
					required
				/>
			</label>
			<label className="modal__label" htmlFor="register-password">
				Password
				<input
					id="register-password"
					name="password"
					type="password"
					className="modal__input"
					placeholder="Password"
					value={values.password}
					onChange={handleChange}
					required
				/>
			</label>
			<label className="modal__label" htmlFor="register-name">
				Name
				<input
					id="register-name"
					name="name"
					type="text"
					className="modal__input"
					placeholder="Name"
					value={values.name}
					onChange={handleChange}
					required
				/>
			</label>
			<label className="modal__label" htmlFor="register-avatar">
				Avatar URL
				<input
					id="register-avatar"
					name="avatar"
					type="url"
					className="modal__input"
					placeholder="Avatar URL"
					value={values.avatar}
					onChange={handleChange}
					required
				/>
			</label>
			{errorMessage && <p className="modal__error">{errorMessage}</p>}
			<button
				type="button"
				className="modal__switch"
				onClick={onSwitchToLogin}
			>
				or Log in
			</button>
		</ModalWithForm>
	);
}

export default RegisterModal;
