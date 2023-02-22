// @ts-check

export const positions = /** @type {const} */ (['defender', 'midfielder', 'forward']);

export const skills = /** @type {const} */ (['defense', 'attack', 'speed', 'strength', 'stamina']);

/** @typedef {typeof positions[number]} Position */

/** @typedef {typeof skills[number]} Skill */

/**
 * @typedef {{
 * 	skill: Skill,
 * 	value: number,
 * }} PlayerSkill
*/

/**
 * @typedef {{
 * 	name: string,
 * 	position: Position,
 * 	playerSkills: PlayerSkill[],
 * }} Player
*/

/** @type {(value: any) => asserts value is PlayerSkill} */
export const assertPlayerSkill = (value) => {
	if (
		typeof value !== 'object'
		|| value === null
	) throw new Error('invalid playerSkill. expected object');

	// @ts-ignore
	if (!skills.includes(value.skill)) {
		throw new Error(`invalid value for skill: ${value.skill}`);
	}
	if (typeof value.value !== 'number' || value.value < 0) {
		throw new Error(`invalid value for value: ${value.value}`);
	}
};

/** @type {(value: any) => asserts value is Player} */
export const assertPlayer = (value) => {
	if (
		typeof value !== 'object'
		|| value === null
	) throw new Error('invalid player. expected object');

	if (!value.name || typeof value.name !== 'string') {
		throw new Error(`invalid value for name: ${value.name}`);
	}
	// @ts-ignore
	if (!positions.includes(value.position)) {
		throw new Error(`invalid value for position: ${value.position}`);
	}
	if (!Array.isArray(value.playerSkills) || value.playerSkills.length === 0) {
		throw new Error(`invalid value for playerSkills: ${value.playerSkills}`);
	}
	value.playerSkills.forEach(assertPlayerSkill);
};

/** @type {(value: any) => asserts value is Player[]} */
export const assertPlayers = (value) => {
	if (!Array.isArray(value)) throw new Error('invalid player list. must be array!');
	value.forEach(assertPlayer);
};
