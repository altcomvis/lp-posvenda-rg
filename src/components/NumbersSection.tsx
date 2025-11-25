import { useContent } from "@/hooks/useContent";
import { Card } from "./ui/card";

export default function NumbersSection() {
	const { content } = useContent();
	const { numbers } = content;

	return (
		<section id={numbers.id} className="w-full py-16">
			<div className="container mx-auto px-4">
				<div className="max-w-5xl mx-auto text-center">
					<h3 className="text-xl md:text-3xl font-bold text-indigo-900 mb-4">
						{numbers.highlightTitle}
					</h3>

					<div className="space-y-3 text-sm md:text-base text-neutral-800 mb-10">
						{numbers.introParagraphs.map((p, idx) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<p className="md:px-24 " key={idx}>
								{p}
							</p>
						))}
					</div>

					<h2 className="text-3xl md:text-4xl font-title mb-8 text-red-600">
						{numbers.sectionTitle}
					</h2>

					<div className="gap-6 md:gap-8 flex flex-wrap justify-center items-center ">
						{numbers.metrics.map((m) => (
							<Card
								key={m.label}
								className="bg-gray-100 shadow p-6 text-center border-neutral-200 h-56 rounded-none w-56 flex flex-col justify-center items-center"
							>
								<h3 className="text-4xl font-title text-indigo-900">
									{m.value}
								</h3>
								<p className="text-sm text-neutral-700 mt-2">{m.label}</p>
							</Card>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
