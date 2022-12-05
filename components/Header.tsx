import Link from 'next/link';
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
	const { currentUser, logOut } = useAuth()!;

	async function handleClick() {
		await logOut();
	}

	return (
		<div className="px-6 py-4 bg-[#313638] flex justify-between">
			<div className="w-fit">
				<Link href="/">
					<h1 className="text-[#DC5F00] font-bold w-fit">Time Killer</h1>
				</Link>
			</div>

			<div>
				{currentUser ? (
					<button onClick={handleClick}>Logout</button>
				) : (
					<div className="flex gap-x-4">
						<Link href="login" className="text-[#DC5F00] hover:opacity-80">
							Login
						</Link>
						<Link href="register" className="text-[#DC5F00] hover:opacity-80">
							Register
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
