// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------
//@ts-check

import database from '../../db/model';
import { assertAuth } from '../../utils/auth';

export default async (req, res) => {
	try {
		assertAuth(req);
		const number = await database.Player.destroy({
			where: { id: req.params.id },
		});
		return res.status(200).json(number);
	}
	catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
