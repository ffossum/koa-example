import shortid from 'shortid';
import _ from 'lodash';
import db from './index';
import {
  NOT_STARTED,
  IN_PROGRESS,
} from 'constants/gameStatus';

async function create(options) {
  const { host } = options;
  const gameId = shortid.generate();

  try {
    await db.tx(t => {
      const q1 = t.none(`INSERT INTO games(id, host)
        VALUES ($(gameId), $(host))`, { gameId, host });
      const q2 = t.none(`INSERT INTO users_games(user_id, game_id)
        VALUES ($(host), $(gameId))`, { host, gameId });

      return t.batch([q1, q2]);
    });

    return {
      id: gameId,
      host: options.host,
      users: [options.host],
      status: NOT_STARTED,
    };
  } catch (e) {
    return null;
  }
}

async function join(gameId, userId) {
  try {
    db.none('INSERT INTO users_games(user_id, game_id) VALUES ($(userId), $(gameId))',
      { userId, gameId }
    );
    return true;
  } catch (e) {
    return false;
  }
}

async function leave(gameId, userId) {
  try {
    db.none('DELETE FROM users_games WHERE user_id=$(userId) AND game_id=$(gameId)',
      { userId, gameId }
    );
    return true;
  } catch (e) {
    return false;
  }
}

async function start(gameId, userId) {
  try {
    const result = await db.result(`
      UPDATE games
      SET status = $(IN_PROGRESS)
      WHERE id=$(gameId) AND host=$(userId)
    `, {
      IN_PROGRESS,
      gameId,
      userId,
    });

    return !!result.rowCount;
  } catch (e) {
    return false;
  }
}

export async function getUserGames(userId) {
  const games = await db.any(`
    SELECT games.id, games.host, array_agg(users_games.user_id) AS users, status
    FROM games, users_games
    WHERE games.id=users_games.game_id AND users_games.user_id=$1
    GROUP BY games.id`,
    userId,
  );

  return _.keyBy(games, game => game.id);
}

async function get(gameId) {
  return await db.one(`
    SELECT games.id, games.host, array_agg(users_games.user_id) AS users, status
    FROM games, users_games
    WHERE games.id=users_games.game_id AND games.id=$1
    GROUP BY games.id`,
    gameId
  );
}

async function getNotStarted() {
  const games = await db.any(`
    SELECT games.id, games.host, array_agg(users_games.user_id) AS users, status
    FROM games, users_games
    WHERE games.id=users_games.game_id AND status=$1
    GROUP BY games.id`, NOT_STARTED
  );

  return _.keyBy(games, game => game.id);
}

export default {
  create,
  join,
  leave,
  start,
  get,
  getNotStarted,
  getUserGames,
};
