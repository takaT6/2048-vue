import { nextTick } from "vue";
import { defaultGameState, keymap, setCurrentGame, state, vectorMap } from "./const";
import { setItem } from "./util";
const log = (mssg: any)=> console.log(mssg);

export const createRndmInbox = (n: number) => {
	for(var i = 0 ; i < n ; i++) {
		const availableBoxes = getAvailableBoxes();
		const rndmBox = getRndmBox(availableBoxes);
		if(rndmBox){
			state.currentGame.inboxes.push({
				...rndmBox,
				val: Math.random() < 0.9 ? 2 : 4,//確率で2か４のboxを生成
				id: ++state.currentGame.id,
			});
		}
	}
}

// 利用可能なboxを返す
const getAvailableBoxes = () => {
	const availableBoxes = [];
	const checkAndPush = (x: number, y: number) => {
    if(isBoxAvailable({x, y})) {
      availableBoxes.push({x, y})
    }
  }
	getInboxInfo(checkAndPush)
	return availableBoxes;
}

// ランダムなboxを返す
const getRndmBox = (availableBoxes) => {
	return availableBoxes.length ? availableBoxes[Math.floor(Math.random() * availableBoxes.length)] : false;
}

// 現在のinboxを返す
const getInboxIndex = (pos) =>
  state.currentGame.inboxes.findIndex(
    (box) => box.x === pos.x && box.y === pos.y && !box.t
)

const isBoxAvailable = (xANDy) => getInboxIndex(xANDy) === -1;

const getInboxInfo = (callback: Function) => {
	for(var x = 0 ; x < state.size ; x++){
		for(var y = 0 ; y < state.size ; y++){
			callback(x, y);
		}
	}
}

export const startGame = () => {
	if(!(state.currentGame.inboxes.length && !state.currentGame.isOver)){
		setCurrentGame(defaultGameState());
		nextTick(() => createRndmInbox(2));
	}
}

export const newGame = () => {
	setCurrentGame(defaultGameState());
	nextTick(() => createRndmInbox(2));
}

export const keyDownEvent = (event) => {
	const keyCode = event.which;
	const direction = keymap[keyCode];

	if(direction !== undefined){
		log(direction + " was pushed!")
		event.preventDefault();
		moveInboxes(direction);
	}
}
const isBounds = (pos) => {
	return pos.x >= 0 && pos.x < state.size && pos.y >= 0 && pos.y < state.size;
}

const isInboxMatchAvailable = () => {
	for(let i = 0 ; i < state.currentGame.inboxes.length ; i++){
		const inbox = state.currentGame.inboxes[i];

		for(var dir = 0 ; dir < 4 ; dir++){
			var vector = vectorMap[dir];

			const index = getInboxIndex({
				x: inbox.x + vector.x, 
				y: inbox.y + vector.y}
				);

			if(index !== -1 && state.currentGame.inboxes[index].val === inbox.val){
				return true;
			}
		}
	}
	return false;
}

const moveInboxes = (direction: number) => {
	for(var i = state.currentGame.inboxes.length-1 ; i >= 0 ; --i){
		if(state.currentGame.inboxes[i].t){
			state.currentGame.inboxes.splice(i,1);
		}else{
			state.currentGame.inboxes[i].m = 0;
		}
	}

	// 方向ベクトルの取得
	const vector = vectorMap[direction];
	
	let isMoved = false;

	getInboxInfo((x, y) => {
		if(vector.x === 1){
			x = state.size - 1 - x;
		}
		if(vector.y === 1){
			y = state.size - 1 - y;
		}

		const inboxIndex = getInboxIndex({x,y});
		const inbox = state.currentGame.inboxes[inboxIndex];

		if(inbox){
			let pos = { x: inbox.x, y: inbox.y};

			do{
				pos.x = pos.x + vector.x;
				pos.y = pos.y + vector.y;
			}while(isBounds(pos) && isBoxAvailable(pos));

			const previous = {x: pos.x - vector.x, y: pos.y - vector.y};

			const nextInboxNum = getInboxIndex(pos);

			const nextInbox = state.currentGame.inboxes[nextInboxNum];

			if(nextInbox && !nextInbox.m && !nextInbox.t && nextInbox.val === inbox.val){
				const inboxDestination = state.currentGame.inboxes[nextInboxNum];
				Object.assign(state.currentGame.inboxes[inboxIndex], {
					x: inboxDestination.x, 
					y: inboxDestination.y, 
					t: 1
				});

				state.currentGame.inboxes[nextInboxNum].t = true;
				const value = inboxDestination.val*2;
				
				if(value == 2048 && !state.currentGame.isWin){
					state.currentGame.isWin = true;
					// popupwindow
				}

				state.currentGame.gameScore += value;

				state.currentGame.inboxes.push({
					x: inboxDestination.x,
					y: inboxDestination.y,
					val: value,
					m: 1,
					id: ++state.currentGame.id
				});

				isMoved = true;
			}else if(inbox.x !== previous.x || inbox.y !== previous.y){
				Object.assign(state.currentGame.inboxes[inboxIndex], previous);
				isMoved = true;
			}
		}
	})

	if(isMoved){
		createRndmInbox(1);
		setItem(`state-${state.size}`, state.currentGame, true);
	}else{
		state.currentGame.isOver = !(state.currentGame.inboxes.length < state.size * state.size || isInboxMatchAvailable());
		
		setItem(`state-${state.size}`, state.currentGame, true);
	}
}