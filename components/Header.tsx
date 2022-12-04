import Link from 'next/link';
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
	const { currentUser, logOut } = useAuth()!;

	async function handleClick() {
		await logOut();
	}

	return (
		<div className="p-2 bg-[#313638]">
			<Link href="/">
				<h1 className="text-[#DC5F00] font-bold">Time Killer</h1>
			</Link>

			{currentUser && <button onClick={handleClick}>Logout</button>}
		</div>
	);
};

export default Header;
