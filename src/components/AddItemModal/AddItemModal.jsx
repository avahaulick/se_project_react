import { useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
	const defaultValues = {
		name: "",
		link: "",
		weatherType: "",
	};

	const { values, setValues, handleChange } = useForm(defaultValues);

	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});
	const [submitAttempted, setSubmitAttempted] = useState(false);
	const [nameSuggestions, setNameSuggestions] = useState([]);

	// load previous names for suggestions once
	useEffect(() => {
		const stored = localStorage.getItem("addItemNameSuggestions");
		if (stored) setNameSuggestions(JSON.parse(stored));
	}, []);

	// when modal closes, reset everything
	useEffect(() => {
		if (!isOpen) {
			setValues(defaultValues);
			setErrors({});
			setTouched({});
			setSubmitAttempted(false);
		}
	}, [isOpen, setValues]);

	const validate = (v) => {
		const e = {};
		if (!v.name || !v.name.trim()) e.name = "Name is required";
		if (!v.link || !v.link.trim()) {
			e.link = "Image URL is required";
		} else {
			try {
				new URL(v.link);
			} catch (err) {
				e.link = "Invalid URL";
			}
		}
		if (!v.weatherType) {
			e.weatherType = "Please select a weather type";
		}
		return e;
	};

	const handleInputChange = (evt) => {
		const { name, value } = evt.target;
		const next = { ...values, [name]: value };
		handleChange(evt);
		setErrors(validate(next));
	};

	const handleBlur = (evt) => {
		const { name } = evt.target;
		setTouched((t) => ({ ...t, [name]: true }));
		setErrors(validate(values));
	};

	const handleRadioClick = (evt) => {
		const { value } = evt.target;
		// If the radio is already selected, deselect it
		if (values.weatherType === value) {
			setValues({ ...values, weatherType: "" });
			setErrors(validate({ ...values, weatherType: "" }));
		}
	};

	function handleSubmit(evt) {
		evt.preventDefault();
		setSubmitAttempted(true);
		const validationErrors = validate(values);
		setTouched({ name: true, link: true, weatherType: true });
		setErrors(validationErrors);
		if (Object.keys(validationErrors).length) return;
		onAddItem(values);
		// update suggestions list (avoid duplicates)
		setNameSuggestions((prev) => {
			const next = prev.includes(values.name) ? prev : [...prev, values.name];
			localStorage.setItem("addItemNameSuggestions", JSON.stringify(next));
			return next;
		});
		// clear all form fields after submit
		setValues(defaultValues);
		setTouched({});
		setErrors({});
		setSubmitAttempted(false);
	}

	const isSubmitDisabled = Object.keys(errors).length > 0;

	return (
		<ModalWithForm
			title="New Garment"
			buttonText="Add Garment"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			isSubmitDisabled={isSubmitDisabled}
		>
			<label htmlFor="name" className="modal__label">
				Name{" "}
				<input
					type="text"
					className="modal__input"
					id="name"
					name="name"
					placeholder="Name"
					value={values.name}
					onChange={handleInputChange}
					onBlur={handleBlur}
					list="name-options"
					autoComplete="off"
				/>
				<datalist id="name-options">
					{nameSuggestions.map((n) => (
						<option key={n} value={n} />
					))}
				</datalist>
				{submitAttempted && errors.name && (
					<p className="modal__error">{errors.name}</p>
				)}
			</label>
			<label htmlFor="imageUrl" className="modal__label">
				Image{" "}
				<input
					type="url"
					className="modal__input"
					id="imageUrl"
					name="link"
					placeholder="Image URL"
					value={values.link}
					onChange={handleInputChange}
					onBlur={handleBlur}
					autoComplete="url"
				/>
				{submitAttempted && errors.link && (
					<p className="modal__error">{errors.link}</p>
				)}
			</label>
			<fieldset className="modal__radio">
				<legend className="modal__legend">Select the weather type:</legend>
				<label htmlFor="hot" className="modal__label modal__label_type_radio">
					<input
						id="hot"
						type="radio"
						name="weatherType"
						className="modal__radio-input"
						value="hot"
						checked={values.weatherType === "hot"}
						onChange={handleInputChange}
						onClick={handleRadioClick}
						onBlur={handleBlur}
						autoComplete="off"
					/>{" "}
					Hot
				</label>
				<label htmlFor="warm" className="modal__label modal__label_type_radio">
					<input
						id="warm"
						type="radio"
						name="weatherType"
						className="modal__radio-input"
						value="warm"
						checked={values.weatherType === "warm"}
						onChange={handleInputChange}
						onClick={handleRadioClick}
						onBlur={handleBlur}
						autoComplete="off"
					/>{" "}
					Warm
				</label>
				<label htmlFor="cold" className="modal__label modal__label_type_radio">
					<input
						id="cold"
						type="radio"
						name="weatherType"
						className="modal__radio-input"
						value="cold"
						checked={values.weatherType === "cold"}
						onChange={handleInputChange}
						onClick={handleRadioClick}
						onBlur={handleBlur}
						autoComplete="off"
					/>{" "}
					Cold
				</label>
				{(touched.weatherType || errors.weatherType) && errors.weatherType && (
					<p className="modal__error">{errors.weatherType}</p>
				)}
			</fieldset>
		</ModalWithForm>
	);
};

export default AddItemModal;
