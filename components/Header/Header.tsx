import Link from 'next/link';
import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
	const { currentUser, logOut } = useAuth()!;

	async function handleClick() {
		await logOut();
	}

	return (
		<div className="px-6 py-4 bg-darkGray flex justify-between">
			<div className="w-fit">
				<Link href="/">
					<h1 className="text-brand font-bold w-fit cursor-pointer">
						Time Killer
					</h1>
				</Link>
			</div>

			<div>
				{currentUser ? (
					<button
						onClick={handleClick}
						className="text-brand hover:opacity-80 cursor-pointer"
					>
						Logout
					</button>
				) : (
					<div className="flex gap-x-4">
						<Link href="login">
							<p className="text-brand hover:opacity-80 cursor-pointer">
								Login
							</p>
						</Link>
						<Link href="register" className="text-brand hover:opacity-80">
							<p className="text-brand hover:opacity-80 cursor-pointer">
								Register
							</p>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
