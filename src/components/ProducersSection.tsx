/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { useContent } from "@/hooks/useContent";

export default function ProducersSection() {
	const { content } = useContent();
	const { producers } = content;

	return (
		<section id={producers.id} className="w-full bg-rose-300/60 py-16">
			<div className="w-10/12 mx-auto px-4">
				<h1 className="text-3xl md:text-5xl font-title text-red-600 md:text-center mb-10">
					{producers.sectionTitle}
				</h1>
				<p className="max-w-3xl mx-auto md:text-center text-sm text-neutral-800 mb-16">
					{producers.intro}
				</p>

				<div className="grid gap-10 lg:grid-cols-2 items-start">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base font-semibold">
						{producers.columns.map((col, idx) => (
							<div key={idx}>
								{col.map((name) => (
									<div key={name}>{name}</div>
								))}
							</div>
						))}
					</div>

					<div>
						<Carousel className="w-full">
							<CarouselContent>
								{producers.images.map((src, idx) => (
									<CarouselItem key={idx} className="basis-full">
										<img
											src={`${import.meta.env.BASE_URL}img/${src}`}
											alt={`Produtor ${idx + 1}`}
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
			</div>
		</section>
	);
}
