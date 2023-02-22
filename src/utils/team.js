/**
 * @typedef {{
 * 	position: import('./player').Position,
 * 	mainSkill: import('./player').Skill,
 * 	numberOfPlayers: number,
 * }} TeamRequirement
*/

import { positions, skills } from './player';

/** @type {(value: any) => asserts value is TeamRequirement[]} */
export const assertTeamRequirements = (value) => {
	if (!Array.isArray(value)) throw new Error('invalid requirements! must be an array');
	if (value.length === 0) throw new Error('empty requirements array!');
	const combinations = [];
	for (const row of value) {
		if (typeof row !== 'object' || row === null) throw new Error('invalid requirement! must be an object');
		if (!positions.includes(row.position)) throw new Error(`invalid requirement position: ${row.position}`);
		if (!skills.includes(row.mainSkill)) throw new Error(`invalid requirement mainSkill: ${row.mainSkill}`);
		if (
			typeof row.numberOfPlayers !== 'number'
			|| row.numberOfPlayers < 1
		) throw new Error(`invalid requirement numberOfPlayers: ${row.noOfPlayers}`);
		const combination = `${row.position}-${row.mainSkill}`;
		if (combinations.includes(combination)) throw new Error(`duplicate requirement position: ${row.position}, mainSkill: ${row.mainSkill}`);
		combinations.push(combination);
	}
};
