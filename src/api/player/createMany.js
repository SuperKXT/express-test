// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------
//@ts-check

import database from '../../db/model';
import { assertPlayers } from '../../utils/player';

export default async (req, res) => {
	try {
		const { body } = req;
		assertPlayers(body);
		const addedPlayers = await database.Player.bulkCreate(body, {
			returning: true,
			include: database.PlayerSkill,
		});
		return res.status(201).json(addedPlayers);
	}
	catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
