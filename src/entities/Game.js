import Entity from './Entity';

/**
 * @typedef {Object} SimplePlayer
 * @property {string} id
 * @property {string} name
 */

/**
 * @namespace GameEntity
 * @property {string} id
 * @property {number} startdate
 * @property {number} duration
 * @property timeline
 * @property {number} winnerScore
 * @property {number} loserScore
 * @property {SimplePlayer} winnerAttack
 * @property {SimplePlayer} winnerDefense
 * @property {SimplePlayer} loserAttack
 * @property {SimplePlayer} loserDefense
 */
export default class Game extends Entity {}
