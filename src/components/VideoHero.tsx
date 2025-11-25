import { useContent } from "@/hooks/useContent";

export default function VideoHero() {
	const { content } = useContent();
	const { hero } = content;

	return (
		<section id={hero.id} className="w-full bg-black">
			<div className="container mx-auto ">
				<div className="relative pb-[56.25%] overflow-hidden  shadow-lg">
					<iframe
						src={hero.videoUrl}
						title={hero.title}
						allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
						className="absolute inset-0 w-full h-full"
					/>
				</div>
			</div>
		</section>
	);
}
