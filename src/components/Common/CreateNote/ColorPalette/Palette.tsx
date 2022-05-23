import { useDispatch, useSelector } from "react-redux";
import { noteActions, RootState } from "../../../../store/store";

function Palette() {
    const themeColours: string[] = ["dark", "pink", "orange", "green", "purple", "brown", "gray"];
    const themeGradients: string[] = ["greenery", "sublime-vivid", "dimigo", "reef", "light-purple", "witching-hour", "titanium"];
	const activeTheme = useSelector((state: RootState) => state.noteTheme);
	const dispatch = useDispatch();

	const themeChange = (e: React.FormEvent, theme: string, value: boolean) => {
		e.preventDefault();
		dispatch(noteActions.setTheme(theme));
	}

	const activeThemeIndicator = (theme: string) => {
		let themeClass: string;
		if (theme === "dark") {
			themeClass = "default-theme-button";
		} else {
			themeClass = theme;
		}

		return theme === activeTheme ? `active-theme ${themeClass}` : themeClass;
	}
	
  	return (
		<div className="palette-container">
		<div className="palette comical-shadow-idle">
			<div className="solid-colours">
				<b>Solid</b>
				<div className="theme-buttons">
					{themeColours.map((themeColour, index) => {
						return <button
							key={index}
							className={activeThemeIndicator(themeColour)}
							onClick={(e) => themeChange(e, themeColour, false)}>
						</button>
					})}
				</div>
			</div>

			<div className="gradient-colours">
				<b>Gradient</b>
				<div className="theme-buttons">
					{themeGradients.map((themeGradient, index) => {
						return <button
							key={index}
							className={activeThemeIndicator(themeGradient)}
							onClick={(e) => themeChange(e, themeGradient, true)}>
						</button>
					})}
				</div>
			</div>
		</div>
	</div>
  );
}

export default Palette;
