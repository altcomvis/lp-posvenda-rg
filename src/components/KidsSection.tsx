/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { useContent } from "@/hooks/useContent";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

export default function KidsSection() {
	const { content } = useContent();
	const { kids } = content;

	return (
		<section id={kids.id} className="w-full bg-amber-300 py-16">
			<div className="w-10/12 mx-auto">
				<div className="grid md:grid-cols-2 items-center justify-center">
					<div className="md:pr-12">
						<h1 className="text-3xl md:text-5xl font-title text-red-600 mb-10">
							{kids.sectionTitle}
						</h1>
						<p className="max-w-3xl mx-auto text-base text-neutral-800 mb-10">
							{kids.intro}
						</p>
					</div>
					<Carousel className="max-w-4xl mx-auto">
						<CarouselContent>
							{kids.images.map((src, idx) => (
								<CarouselItem key={idx} className="basis-full">
									<img
										src={`${import.meta.env.BASE_URL}img/${src}`}
										alt={`Espaço Kids ${idx + 1}`}
										className="w-full h-auto  shadow"
									/>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious className="left-2" />
						<CarouselNext className="right-2" />
					</Carousel>
				</div>
			</div>
		</section>
	);
}
