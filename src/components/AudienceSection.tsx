import { useContent } from "@/hooks/useContent";
import { Card } from "./ui/card";

export default function AudienceSection() {
	const { content } = useContent();
	const { audience } = content;

	return (
		<section id={audience.id} className="w-full bg-white py-16">
			<div className="w-10/12 mx-auto px-4 bg-indigo-950 py-10">
				<h2 className="text-3xl md:text-4xl font-title text-gray-100 text-center mb-10">
					{audience.sectionTitle}
				</h2>

				<div className="grid gap-8 md:grid-cols-3 xl:grid-cols-5 max-w-6xl mx-auto">
					{audience.items.map((item) => (
						<Card
							key={item.title}
							className=" px-3 py-6 text-center bg-indigo-950 border-none rounded-none"
						>
							<img
								src={`${import.meta.env.BASE_URL}img/${item.icon}`}
								alt={item.title}
								className="mx-auto h-20 w-auto"
							/>

							<div className="text-4xl font-title mb-1 text-yellow-300">
								{item.title}
							</div>

							{item.description && (
								<p className="whitespace-pre-line text-sm text-gray-100">
									{item.description}
								</p>
							)}
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
