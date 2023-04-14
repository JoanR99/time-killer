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

			<div className="max-w-xs md:max-w-4xl m-auto flex justify-between gap-x-8 my-8 items-center flex-col md:flex-row">
				<div className="md:w-1/2">
					<LandingImage />
				</div>

				<div className="md:w-1/2 mt-4 md:mt-0">
					<h2 className=" text-2xl text-orange-600 font-extrabold uppercase mb-2 md:mb-4">
						Welcome to Time Killer
					</h2>
					<p>
						You can find in Time Killer several entertaining offline minigames
						with which you can kill time when you are bored. In addition, when
						logged in, you can access the ranking of best scores and compete
						with friends or other people.
					</p>
				</div>
			</div>

			<div className="flex flex-col items-center mt-12 mb-4">
				<h2 className=" text-2xl text-orange-600 font-extrabold uppercase mb-4">
					Games
				</h2>
				<div
					className="flex gap-4 items-center flex-wrap justify-center
				"
				>
					<ImageCard src="/images/simon.png" alt="simon game">
						<Link href="Simon">Simon</Link>
					</ImageCard>

					<ImageCard src="/images/snake.png" alt="snake game">
						<Link href="snake">Snake</Link>
					</ImageCard>

					<div className="hidden lg:block">
						<ImageCard src="/images/flappy.png" alt="flappy game">
							<Link href="flappy">Flappy Bird</Link>
						</ImageCard>
					</div>

					<ImageCard src="/images/memory.png" alt="memory game">
						<Link href="memory">Memory</Link>
					</ImageCard>

					<ImageCard src="/images/tetris.png" alt="tetris game">
						<Link href="tetris">Tetris</Link>
					</ImageCard>
				</div>
			</div>
		</div>
	);
}
