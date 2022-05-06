function Palette() {
    const themeColours: string[] = ["dark", "pink", "orange", "green", "purple", "brown", "gray"];
    const themeGradients: string[] = ["greenery", "sublime-vivid", "dimigo", "reef", "light-purple", "witching-hour", "titanium"];

	const themeChange = (e: React.FormEvent<HTMLButtonElement>, theme: string, value: boolean) => {
		e.preventDefault();
		
	}

	const activeTheme = (theme: string) => {
		if (theme === "dark") {
			return "default-theme-button";
		} else {
			return theme;
		}
	}
	
  	return(
		<div className="palette-container">
		<div className="palette comical-shadow-idle">
			<div className="solid-colours">
				<b>Solid</b>
				<div className="theme-buttons">
					{themeColours.map((themeColour, index) => {
						return <button
							key={index}
							className={activeTheme(themeColour)}
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
							className={activeTheme(themeGradient)}
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
