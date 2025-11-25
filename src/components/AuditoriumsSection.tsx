import { useContent } from "@/hooks/useContent";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

export default function AuditoriumsSection() {
	const { content } = useContent();
	const { auditoriums } = content;

	return (
		<section id={auditoriums.id} className="w-full bg-amber-300 py-16">
			<div className="w-10/12 mx-auto px-4">
				<div className="grid gap-8 md:gap-36 lg:grid-cols-2">
					<div className="">
						<h1 className="text-3xl md:text-5xl font-title text-red-600 mb-10">
							{auditoriums.sectionTitle}
						</h1>
						<h2 className="text-4xl text-indigo-950 font-title mb-2">
							{auditoriums.name}
						</h2>
						<p className="text-sm text-neutral-700 mb-4">
							{auditoriums.description}
						</p>
					</div>
					{auditoriums.items.map((item) => (
						<div key={item.name}>
							<Carousel className="w-full">
								<CarouselContent>
									{item.images.map((src, idx) => (
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										<CarouselItem key={idx} className="basis-full">
											<img
												src={`${import.meta.env.BASE_URL}img/${src}`}
												alt={`${item.name} ${idx + 1}`}
												className="w-full h-auto  shadow"
											/>
										</CarouselItem>
									))}
								</CarouselContent>
								<CarouselPrevious className="left-2" />
								<CarouselNext className="right-2" />
							</Carousel>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
