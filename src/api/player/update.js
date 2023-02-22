// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------
//@ts-check

import database from '../../db/model';
import { assertPlayer } from '../../utils/player';

export default async (req, res) => {
	try {
		const { body, params } = req;
		const { id } = params;
		assertPlayer(body);
		const { playerSkills, ...player } = body;
		const [count] = await database.Player.update(player, {
			where: { id },
		});
		if (!count) throw new Error('no record found against id!');
		const findResponse = await database.Player.findByPk(id, {
			include: database.PlayerSkill,
			nest: true
		});
		if (!findResponse) throw new Error('no record found against id!');
		const updatedPlayer = findResponse.toJSON();
		const skillsResponse = await database.PlayerSkill.bulkCreate(
			playerSkills.map(row => ({ ...row, playerId: id })),
			{ returning: true, }
		);
		updatedPlayer.playerSkills.push(...skillsResponse);
		return res.status(200).json(updatedPlayer);
	}
	catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
