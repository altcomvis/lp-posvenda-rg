import { useContent } from "@/hooks/useContent";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

export default function ShowsSection() {
	const { content } = useContent();
	const { shows } = content;

	return (
		<section id={shows.id} className="w-full bg-cyan-500/40 py-16">
			<div className="w-10/12 mx-auto ">
				<h1 className="text-3xl md:text-5xl font-title text-red-600 md:text-center mb-6">
					{shows.sectionTitle}
				</h1>
				<p className="max-w-3xl mx-auto md:text-center text-sm text-neutral-800 mb-16">
					{shows.intro}
				</p>

				<Carousel className="max-w-5xl mx-auto">
					<CarouselContent>
						{shows.items.map((item) => (
							<CarouselItem
								key={item.name}
								className="basis-full md:basis-1/2 lg:basis-1/3"
							>
								<div className="flex flex-col items-center gap-3">
									<img
										src={`${import.meta.env.BASE_URL}img/${item.image}`}
										alt={item.name}
										className="w-full shadow"
									/>
									<h3 className="text-2xl text-indigo-950 font-title text-center uppercase tracking-wide">
										{item.name}
									</h3>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="left-2" />
					<CarouselNext className="right-2" />
				</Carousel>
			</div>
		</section>
	);
}
