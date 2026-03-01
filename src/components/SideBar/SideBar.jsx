import "./SideBar.css";
import avatar from "../../assets/avatar.png";

export default function SideBar() {
	return (
		<aside className="sidebar">
			<div className="sidebar__profile">
				<img src={avatar} alt="Terrence Tegegne" className="sidebar__avatar" />
				<p className="sidebar__user-name">Terrence Tegegne</p>
			</div>
		</aside>
	);
}
