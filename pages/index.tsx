import Head from 'next/head';
import Link from 'next/link';
import ImageCard from '../components/ImageCard';
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
					<h2 className=" text-2xl text-orange-600 font-extrabold uppercase mb-4">
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
				<h2 className=" text-2xl text-orange-600 font-extrabold uppercase mb-4">
					Games
				</h2>
				<div
					className="flex gap-4 items-center
				"
				>
					<ImageCard src="/images/simon.png" alt="simon game">
						<Link href="simon">Simon</Link>
					</ImageCard>

					<ImageCard src="/images/snake.png" alt="snake game">
						<Link href="snake">Snake</Link>
					</ImageCard>

					<ImageCard src="/images/flappy.png" alt="flappy game">
						<Link href="flappy">Flappy Bird</Link>
					</ImageCard>

					<ImageCard src="/images/memory.png" alt="memory game">
						<Link href="memory">Memory</Link>
					</ImageCard>
				</div>
			</div>
		</div>
	);
}
