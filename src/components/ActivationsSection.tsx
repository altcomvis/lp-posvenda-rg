import { useContent } from "@/hooks/useContent";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

export default function ActivationsSection() {
	const { content } = useContent();
	const { activations } = content;

	return (
		<section id={activations.id} className="w-full bg-rose-300/60 py-16">
			<div className="w-10/12 mx-auto ">
				<div className=" gap-10 grid md:grid-cols-2 items-center">
					<div>
						<h1 className="text-3xl md:text-5xl leading-tight text-red-600 font-title mb-4">
							{activations.sectionTitle}
						</h1>
						<p className="text-base text-neutral-800">{activations.intro}</p>
					</div>

					<div>
						<Carousel className="w-full">
							<CarouselContent>
								{activations.images.map((src, idx) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									<CarouselItem key={idx} className="basis-full">
										<img
											src={`${import.meta.env.BASE_URL}img/${src}`}
											alt={`Ativação ${idx + 1}`}
											className="w-full h-auto shadow"
										/>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious className="left-2" />
							<CarouselNext className="right-2" />
						</Carousel>
					</div>
				</div>
			</div>
		</section>
	);
}
