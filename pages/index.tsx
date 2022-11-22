import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
	return (
		<div>
			<Head>
				<title>Time Killer</title>
				<meta name="description" content="Time Killer" />
			</Head>

			<div className="max-w-xs md:max-w-4xl m-auto">
				<h2 className="font-bold text-xl text-[#DC5F00] text-center my-8">
					GAMES
				</h2>
				<Link
					href="Simon"
					className="border-[#001524] rounded-xl border p-8 bg-[#E0DFD5]"
				>
					Simon
				</Link>

				<Link
					href="snake"
					className="border-[#001524] rounded-xl border p-8 bg-[#E0DFD5]"
				>
					Snake
				</Link>

				<Link
					href="tetris"
					className="border-[#001524] rounded-xl border p-8 bg-[#E0DFD5]"
				>
					Tetris
				</Link>
			</div>
		</div>
	);
}
