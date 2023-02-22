// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------
//@ts-check

import database from '../../db/model';

export default async (_req, res) => {
	try {
		const players = await database.Player.findAll({
			include: database.PlayerSkill,
			nest: true,
		});
		return res.status(200).json(players);
	}
	catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
