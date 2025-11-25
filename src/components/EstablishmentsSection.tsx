/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
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

export default function EstablishmentsSection() {
	const { content } = useContent();
	const { establishments } = content;

	return (
		<section id={establishments.id} className="w-full py-16 bg-cyan-500/40">
			<div className="w-10/12 mx-auto px-4">
				<div>
					<h1 className="text-3xl md:text-5xl font-title text-red-600 md:text-center mb-10">
						{establishments.sectionTitle}
					</h1>
					<p className="max-w-3xl mx-auto md:text-center text-sm text-neutral-800 mb-10">
						{establishments.intro}
					</p>
				</div>

				<Accordion
					type="single"
					collapsible
					className="max-w-6xl mx-auto bg-transparent border-none"
				>
					{establishments.accordion.map((item, idx) => (
						<AccordionItem key={item.title} value={`item-${idx}`}>
							<AccordionTrigger className="px-6 text-3xl font-title text-indigo-950">
								{item.title}
							</AccordionTrigger>
							<AccordionContent className="md:px-6 pb-6">
								<div className="grid gap-8 lg:grid-cols-2 items-start">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
										{item.columns.map((col, cIdx) => (
											<div key={cIdx}>
												{col.map((name) => (
													<div key={name}>{name}</div>
												))}
											</div>
										))}
									</div>

									<div className="">
										<Carousel className="w-full">
											<CarouselContent>
												{item.images.map((src, iIdx) => (
													<CarouselItem key={iIdx} className="basis-full">
														<img
															src={`${import.meta.env.BASE_URL}img/${src}`}
															alt={`${item.title} ${iIdx + 1}`}
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
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
