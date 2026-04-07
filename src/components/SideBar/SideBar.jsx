import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({ onEditProfile, onSignOut }) {
	const currentUser = useContext(CurrentUserContext);
	const hasAvatar = Boolean(currentUser?.avatar);
	const userInitial = (currentUser?.name ?? "U").charAt(0).toUpperCase();

	return (
		<aside className="sidebar">
			<div className="sidebar__profile">
				{hasAvatar ? (
					<img
						src={currentUser.avatar}
						alt={currentUser?.name ?? "User avatar"}
						className="sidebar__avatar"
					/>
				) : (
					<div className="sidebar__avatar_none">{userInitial}</div>
				)}
				<p className="sidebar__user-name">{currentUser?.name}</p>
				<button
					type="button"
					className="sidebar__action-btn"
					onClick={onEditProfile}
				>
					Change profile data
				</button>
				<button
					type="button"
					className="sidebar__action-btn"
					onClick={onSignOut}
				>
					Log out
				</button>
			</div>
		</aside>
	);
}
