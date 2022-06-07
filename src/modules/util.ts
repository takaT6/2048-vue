import { computed } from "vue";
import { state } from "./const";

export const getItem = (key: string, defaultValue: any, parse: boolean = false) => {
	const value = localStorage.getItem(key);
	if(parse){
		let parsed = null;
		try{
			parsed = JSON.parse(value);
		} catch(e){
			parsed = null;
		}
		return parsed || defaultValue;
	}
	return value || defaultValue;
};

export const setItem = (key, value, stringify: boolean = false) => {
	localStorage.setItem(key, stringify ? JSON.stringify(value) : value);
	console.log(key)
	console.log(getItem(key,{}))
};

// export const canMove = computed(() => {
// 	return (
// 	  !state.currentGame.isGameover &&
// 	  !state.showPopupGridSize &&
// 	  !state.showPopupWin
// 	);
// });

export const onKeyDown = (event) => {
  console.log(event.keyCode+" was down");
  return event.keyCode
}
