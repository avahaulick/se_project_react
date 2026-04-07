import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({
	isOpen,
	onClose,
	onLogin,
	onSwitchToRegister,
	isLoading,
	errorMessage,
}) {
	const { values, setValues, handleChange } = useForm({
		email: "",
		password: "",
	});

	const handleSubmit = (evt) => {
		evt.preventDefault();
		onLogin(values)
			.then(() => {
				setValues({ email: "", password: "" });
			})
			.catch(console.error);
	};

	return (
		<ModalWithForm
			title="Log in"
			buttonText={isLoading ? "Logging in..." : "Log in"}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			isSubmitDisabled={isLoading || !values.email || !values.password}
		>
			<label className="modal__label" htmlFor="login-email">
				Email
				<input
					id="login-email"
					name="email"
					type="email"
					className="modal__input"
					placeholder="Email"
					value={values.email}
					onChange={handleChange}
					required
				/>
			</label>
			<label className="modal__label" htmlFor="login-password">
				Password
				<input
					id="login-password"
					name="password"
					type="password"
					className="modal__input"
					placeholder="Password"
					value={values.password}
					onChange={handleChange}
					required
				/>
			</label>
			{errorMessage && <p className="modal__error">{errorMessage}</p>}
			<button
				type="button"
				className="modal__switch"
				onClick={onSwitchToRegister}
			>
				or Sign up
			</button>
		</ModalWithForm>
	);
}

export default LoginModal;
