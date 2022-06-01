import { useDispatch, useSelector } from "react-redux";
import { noteActions, RootState } from "../../../../../store/store";

function Palette() {
	const themeColourList: string[] = ["dark", "pink", "orange", "green", "purple", "brown", "gray"];
	const themeGradientList: string[] = ["greenery", "sublime-vivid", "dimigo", "reef", "light-purple", "witching-hour", "titanium"];
	
	const dispatch = useDispatch();	
	const activeTheme = useSelector((state: RootState) => state.noteTheme);

	const themeChange = (e: React.FormEvent, theme: string, isGradient: boolean) => {
		e.preventDefault();
		dispatch(noteActions.setNoteTheme(theme));
		dispatch(noteActions.noteThemeIsGradient(isGradient));
	}

	const themeClasses = (theme: string) => {
		let themeClass: string;
		if (theme === "dark") {
			themeClass =  "default-theme-button";
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
						{themeColourList.map((colour, index) => (
							<button
								key={index}
								className={themeClasses(colour)}
								onClick={(e) => themeChange(e, colour, false)}>
							</button>
						))}
					</div>
				</div>

				<div className="gradient-colours">
					<b>Gradient</b>
					<div className="theme-buttons">
						{themeGradientList.map((gradient, index) => (
							<button
								key={index}
								className={themeClasses(gradient)}
								onClick={(e) => themeChange(e, gradient, true)}>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
  	);
}

export default Palette;
