import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/image/react-seeklogo.com.svg";

const Header = () => (
	<header className="header">
		<div className="header__logo-box">
			<img src={logo} alt="logo" className="header__logo" />
		</div>
		<nav className="header__nav">
			<ul className="header__list">
				<li className="header__item">
					<Link className="header__link" to="/">
						Home
					</Link>
				</li>
				<li className="header__item">
					<Link className="header__link" to="/auth">
						Auth
					</Link>
				</li>
			</ul>
		</nav>
	</header>
);

export default Header;
