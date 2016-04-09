import {
  PLAYER_JOINED,
  PLAYER_LEFT,
} from 'actions/gameRoom';

const texts = {
  [PLAYER_JOINED]: player => `${player} joined the game.`,
  [PLAYER_LEFT]: player => `${player} left the game.`,
};

export default function getText(key, ...args) {
  const textFunc = texts[key];
  return textFunc ? textFunc(...args) : '';
}
