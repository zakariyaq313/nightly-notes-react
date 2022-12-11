function HeartColored(): JSX.Element {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
			<linearGradient
				xmlns="http://www.w3.org/2000/svg"
				id="SVGID_1_"
				x1="256"
				x2="256"
				y1="512"
				y2="0"
				gradientUnits="userSpaceOnUse"
			>
				<stop offset="0" stopColor="#fd3a84"></stop>
				<stop offset="1" stopColor="#ffa68d"></stop>
			</linearGradient>
			<linearGradient
				xmlns="http://www.w3.org/2000/svg"
				id="SVGID_2_"
				x1="256"
				x2="256"
				y1="421"
				y2="121"
				gradientUnits="userSpaceOnUse"
			>
				<stop offset="0" stopColor="#ffc2cc"></stop>
				<stop offset="1" stopColor="#fff2f4"></stop>
			</linearGradient>
			<g xmlns="http://www.w3.org/2000/svg">
				<circle
					cx="256"
					cy="256"
					r="256"
					fill="url(#SVGID_1_)"
					data-original="url(#SVGID_1_)"
				></circle>
				<path
					fill="url(#SVGID_2_)"
					d="M331 121c-32.928 0-58.183 18.511-75 46.058C239.18 139.506 213.923 121 181 121c-25.511 0-48.788 10.768-65.541 30.32C99.687 169.729 91 194.313 91 220.545c0 28.523 10.698 54.892 33.666 82.986 20.138 24.632 49.048 49.971 82.524 79.313 12.376 10.848 25.174 22.065 38.775 34.306 2.853 2.567 6.444 3.85 10.035 3.85s7.182-1.283 10.035-3.851c13.601-12.241 26.398-23.458 38.775-34.306 33.476-29.341 62.386-54.681 82.524-79.313C410.302 275.438 421 249.068 421 220.545 421 166.908 384.252 121 331 121z"
					data-original="url(#SVGID_2_)"
				></path>
			</g>
		</svg>
	);
}

export default HeartColored;
