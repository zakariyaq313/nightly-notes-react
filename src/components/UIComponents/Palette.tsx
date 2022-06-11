import { useDispatch, useSelector } from "react-redux";
import { noteActions, RootState } from "../../store/store";
import "../../styles/palette/palette.scss";

function Palette(): JSX.Element {
	const solidColourList: string[] = ["dark", "pink", "orange", "green", "purple", "brown", "gray"];
	const gradientColourList: string[] = ["greenery", "sublime-vivid", "dimigo", "reef", "light-purple", "witching-hour", "titanium"];
	
	const dispatch = useDispatch();	
	const activeTheme = useSelector((state: RootState) => state.noteTheme.colour);

	const themeChange = (e: React.MouseEvent<HTMLButtonElement>, colour: string, isGradient: boolean) => {
		e.preventDefault();
		dispatch(noteActions.setNoteTheme({
			colour: colour,
			isGradient: isGradient
		}));
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
						{solidColourList.map((solidColour, index) => (
							<button key={index}
								className={themeClasses(solidColour)}
								onClick={(e) => themeChange(e, solidColour, false)}>
							</button>
						))}
					</div>
				</div>

				<div className="gradient-colours">
					<b>Gradient</b>
					<div className="theme-buttons">
						{gradientColourList.map((gradientColour, index) => (
							<button key={index}
								className={themeClasses(gradientColour)}
								onClick={(e) => themeChange(e, gradientColour, true)}>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
  	);
}

export default Palette;
