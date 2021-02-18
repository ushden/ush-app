import { auth } from '../libs/firebase';
import { useEffect, useState } from 'react';

export const useUser = () => {
	const [user, setUser] = useState<any>(false);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(false);
			}
		});

		return () => unsubscribe();
	}, [user]);

	return user;
};
