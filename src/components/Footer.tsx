import { useContent } from "@/hooks/useContent";

export default function Footer() {
	const { content } = useContent();
	const { site } = content;

	return (
		<footer className="w-full bg-blue-950 text-neutral-200 py-6">
			<div className="container mx-auto px-4 flex flex-col items-center gap-2">
				<span className="text-xs uppercase tracking-wide">
					{site.footerLabel}
				</span>
				<img
					src={`${import.meta.env.BASE_URL}img/${site.footerLogoUrl}`}
					alt="O Globo"
					className="h-6 w-auto"
				/>
			</div>
		</footer>
	);
}
