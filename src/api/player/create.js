// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------
//@ts-check

import database from '../../db/model';
import { assertPlayer } from '../../utils/player';

export default async (req, res) => {
	try {
		const { body } = req;
		assertPlayer(body);
		const response = await database.Player.create(body, {
			raw: true,
			returning: true,
			include: database.PlayerSkill,
		});
		const addedPlayer = response.toJSON();
		return res.status(201).json(addedPlayer);
	}
	catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
