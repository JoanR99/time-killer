import Link from 'next/link';
import React from 'react';

const Header = () => {
	return (
		<div className="p-2 bg-[#313638]">
			<Link href="/">
				<h1 className="text-[#DC5F00] font-bold">Time Killer</h1>
			</Link>
		</div>
	);
};

export default Header;
