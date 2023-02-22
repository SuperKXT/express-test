// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------
//@ts-check

import database from '../../db/model';
import { positions } from '../../utils/player';
import { assertTeamRequirements } from '../../utils/team';

export default async (req, res) => {
	try {
		const { body } = req;
		assertTeamRequirements(body);
		const team = [];

		const players = (await database.Player.findAll({
			include: database.PlayerSkill,
			nest: true,
		})).map(row => row.toJSON());

		/** @type {Record<import('../../utils/player').Position, (import('../../utils/player').Player & {id: number })[]>} */
		// @ts-ignore
		const positionPlayers = positions.reduce(
			(object, position) => ({
				...object,
				[position]: players.filter(row => row.position === position).sort((a, b) => {
					const aValue = a.playerSkills.sort((a, b) => b.value - a.value)[0]?.value ?? -Infinity;
					const bValue = b.playerSkills.sort((a, b) => b.value - a.value)[0]?.value ?? -Infinity;
					return bValue - aValue;
				}),
			})
			, {}
		);

		for (const { position, mainSkill, numberOfPlayers } of body) {
			const eligible = positionPlayers[position];
			if (eligible.length < numberOfPlayers) {
				throw new Error(`Insufficient number of players for position: ${position}`);
			}
			const ranked = eligible.sort((a, b) => {
				const aSkill = a.playerSkills.find(row => row.skill === mainSkill);
				const bSkill = b.playerSkills.find(row => row.skill === mainSkill);
				if (aSkill && !bSkill) return -1;
				if (!aSkill && bSkill) return 1;
				if (aSkill && bSkill) return bSkill.value - aSkill.value;
				return 0;
			});
			const picked = ranked.slice(0, numberOfPlayers);
			positionPlayers[position] = positionPlayers[position].filter(({ id }) =>
				picked.every(row => row.id !== id)
			);
			team.push(...picked);
		}

		return res.status(200).json(team);
	}
	catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
