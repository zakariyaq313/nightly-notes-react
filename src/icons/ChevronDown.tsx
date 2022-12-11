type Props = {
	style: string
};

function ChevronDown(props: Props): JSX.Element {	
	return (
		<svg style={{transform: props.style}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path fill="none" d="M0 0h24v24H0z"></path>
			<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
		</svg>
	);
}

export default ChevronDown;
