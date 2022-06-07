import { computed, reactive, watch } from "vue"
import { getItem, setItem } from "./util"

// ゲームオブジェクトののデフォルト
export const defaultGameState= () => ({
	isOver: false,
	isWin: false,
	gameScore: 0,
  inboxes:[], //パネルを格納
  id:0, //識別ID
})

// 現行のゲームのデータ
const size = getItem('game-size', 4);
export const state = reactive({
	size,
	bestScore: getItem('game-bestscore', {}, true),
	currentGame: getItem('state-' + size, defaultGameState(), true),
  boardWidth: 0,
  showPopupGridSize: false,
  showPopupWin: false,
})

// 現行のゲームをセット
export const setCurrentGame = (game) => {
	// コピー
	Object.assign(state.currentGame, game);
}

export const setGameGridSize = (size) => {
	state.size = size;
	setItem('size', size);
  // デフォルトのゲームデータをセット
	setCurrentGame(getItem('state-' + size, defaultGameState(), true));
}

watch(
  () => state.currentGame.gameScore,
  (gameScore) => {
    if (gameScore > (state.bestScore[state.size] || 0)) {
      state.bestScore[state.size] = gameScore;
      setItem('game-bestscore', state.bestScore, true);
    }
  }
);

// キーマップ
export const keymap = {
  38: 0, // Up
  39: 1, // Right
  40: 2, // Down
  37: 3, // Left
  75: 0, // Vim up
  76: 1, // Vim right
  74: 2, // Vim down
  72: 3, // Vim left
  87: 0, // W
  68: 1, // D
  83: 2, // S
  65: 3, // A
};

// ベクトルマップ
export const vectorMap = [
  { x: 0, y: -1 }, // Up,
  { x: 1, y: 0 }, // Right
  { x: 0, y: 1 }, // Down
  { x: -1, y: 0 }, // Left
];
