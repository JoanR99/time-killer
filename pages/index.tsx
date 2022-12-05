import Head from 'next/head';
import Link from 'next/link';
import LandingImage from '../components/LandingImage';

export default function Home() {
	return (
		<div>
			<Head>
				<title>Time Killer</title>
				<meta name="description" content="Time Killer" />
			</Head>

			<div className="max-w-xs md:max-w-4xl m-auto flex justify-between gap-x-8 my-8 items-center">
				<div className="w-1/2">
					<LandingImage />
				</div>

				<div className="w-1/2">
					<h2 className=" text-2xl text-[#dc5f00] font-extrabold uppercase mb-4">
						Welcome to Time Killer
					</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
						corrupti ducimus aperiam recusandae! Consectetur quo ipsum modi
						totam praesentium eum libero maiores, necessitatibus optio ea,
						nostrum est illum, aspernatur veritatis vitae omnis harum quidem
						repellat atque molestiae voluptates nobis? Cupiditate voluptate iste
						impedit. Earum laborum sequi eveniet minima similique qui.
					</p>
				</div>
			</div>

			<div className="flex flex-col items-center mt-12">
				<h2 className=" text-2xl text-[#dc5f00] font-extrabold uppercase mb-4">
					Games
				</h2>
				<div
					className="flex gap-4 items-center
				"
				>
					<Link
						href="simon"
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

					<Link
						href="flappy"
						className="border-[#001524] rounded-xl border p-8 bg-[#E0DFD5]"
					>
						Flappy Bird
					</Link>

					<Link
						href="memory"
						className="border-[#001524] rounded-xl border p-8 bg-[#E0DFD5]"
					>
						Memory
					</Link>
				</div>
			</div>
		</div>
	);
}
