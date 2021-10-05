import { Dimensions } from 'react-native';

let screenHeight = Math.round(Dimensions.get('window').height);
let screenWidth = Math.round(Dimensions.get('window').width);

export const inner = {
	header: {
		center: {
			color: '#fff',
			fontSize: 16,
			fontWeight: 'bold'
		},
		container: {
			paddingTop: 0,
			height: 50,
			backgroundColor: "#4f748e",
		}
	}
}