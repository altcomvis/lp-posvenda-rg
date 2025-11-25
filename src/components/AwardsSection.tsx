/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { useContent } from "@/hooks/useContent";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

export default function AwardsSection() {
	const { content } = useContent();
	const { awards } = content;

	return (
		<section id={awards.id} className="w-full py-16 bg-rose-300/60">
			<div className="w-10/12 mx-auto px-4">
				<div className="grid gap-10 lg:grid-cols-2 items-start">
					<div className="pr-12">
						<h1 className="text-3xl md:text-5xl font-title text-red-600 mb-10">
							{awards.sectionTitle}
						</h1>
						<div className="space-y-4 text-sm text-neutral-800 whitespace-pre-line">
							{awards.paragraphs.map((p, idx) => (
								<p key={idx}>{p}</p>
							))}
						</div>
					</div>

					<div>
						<Carousel className="w-full">
							<CarouselContent>
								{awards.images.map((src, idx) => (
									<CarouselItem key={idx} className="basis-full">
										<img
											src={`${import.meta.env.BASE_URL}img/${src}`}
											alt={`Premiação ${idx + 1}`}
											className="w-full h-auto  shadow-lg"
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
