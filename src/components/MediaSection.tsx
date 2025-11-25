import { useContent } from "@/hooks/useContent";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

export default function MediaSection() {
	const { content } = useContent();
	const { media } = content;

	return (
		<section id={media.id} className="w-full bg-amber-300 py-16">
			<div className="w-10/12 mx-auto ">
				<div className="grid gap-10 lg:grid-cols-2 items-start">
					<div>
						<h1 className="text-3xl md:text-5xl font-title text-red-600 mb-6">
							{media.sectionTitle}
						</h1>

						<Accordion type="single" collapsible className=" ">
							{media.items.map((item, idx) => (
								<AccordionItem
									key={item.title}
									value={`media-${idx}`}
									className={item.hidden ? "hidden md:block" : ""}
								>
									<AccordionTrigger className="px-5 font-title text-2xl text-indigo-950 uppercase">
										{item.title}
									</AccordionTrigger>
									<AccordionContent className="px-5 pb-4">
										<p className="whitespace-pre-line text-sm text-neutral-800">
											{item.body}
										</p>
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>

					<div>
						<Carousel className="w-full">
							<CarouselContent>
								{media.images.map((src, idx) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									<CarouselItem key={idx} className="basis-full">
										<img
											src={`${import.meta.env.BASE_URL}img/${src}`}
											alt={`Divulgação ${idx + 1}`}
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
