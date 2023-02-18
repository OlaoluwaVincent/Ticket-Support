import { Player } from '@lottiefiles/react-lottie-player';

const LoadingState = () => {
	return (
		<Player
			src={'https://assets3.lottiefiles.com/packages/lf20_a2chheio.json'}
			className='player'
			speed={2}
			style={{ height: '300px', width: '300px' }}
			autoplay={true}
			loop={true}
		/>
	);
};

export default LoadingState;
