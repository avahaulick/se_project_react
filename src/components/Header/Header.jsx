import { useContext } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
	handleAddClick,
	handleRegisterClick,
	handleLoginClick,
	weatherData,
	isLoggedIn,
}) {
	const currentUser = useContext(CurrentUserContext);
	const userInitial = (currentUser?.name ?? "U").charAt(0).toUpperCase();
	const hasAvatar = Boolean(currentUser?.avatar);

	const currentDate = new Date().toLocaleString("default", {
		month: "long",
		day: "numeric",
	});

	return (
		<header className="header">
			<Link to="/" className="header__logo-link">
				<img className="header__logo" src={logo} alt="WTWR logo" />
			</Link>
			<p className="header__date-and-location">
				{currentDate}, {weatherData.city}
			</p>
			<ToggleSwitch />
			{isLoggedIn ? (
				<>
					<button
						onClick={handleAddClick}
						type="button"
						className="header__add-clothes-btn"
					>
						+ Add clothes
					</button>
					<Link to="/profile" className="header__profile-link">
						<div className="header__user-container">
							<p className="header__username">{currentUser?.name}</p>
							{hasAvatar ? (
								<img
									src={currentUser.avatar}
									alt={currentUser?.name ?? "User avatar"}
									className="header__avatar"
								/>
							) : (
								<div className="header__avatar-placeholder">{userInitial}</div>
							)}
						</div>
					</Link>
				</>
			) : (
				<div className="header__auth-buttons">
					<button
						type="button"
						onClick={handleRegisterClick}
						className="header__auth-btn"
					>
						Sign up
					</button>
					<button
						type="button"
						onClick={handleLoginClick}
						className="header__auth-btn"
					>
						Log in
					</button>
				</div>
			)}
		</header>
	);
}

export default Header;
