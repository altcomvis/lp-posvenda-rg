import { useContent as useContentHook } from "@/hooks/useContent";
import type { SponsorBlock } from "@/types/content";
import PasswordProtectedPDF from "./PasswordProtectedPDF";

export default function SponsorsSection() {
	const { content, protectedPdfs } = useContentHook();
	const { sponsors, site } = content;

	function getPdfInfo(id: string) {
		return protectedPdfs.find((p) => p.id === id);
	}

	return (
		<section id={sponsors.id} className="w-full py-20">
			<div className="w-10/12 mx-auto px-4">
				<h1 className="text-3xl md:text-5xl font-title text-red-600 md:text-center mb-4">
					{sponsors.sectionTitle}
				</h1>

				<h2 className="md:text-center text-sm mb-20">
					Clique na sua marca para acessar o PDF exclusivo de pós-venda.
				</h2>

				<div className="flex flex-wrap justify-center gap-16">
					{sponsors.blocks.map((block: SponsorBlock) => (
						<div key={block.id} className="flex flex-col items-center min-w-52">
							{block.label && (
								<div className="w-full pb-6 flex flex-col items-center">
									<p className="text-center text-xs font-light text-neutral-700 mb-6 uppercase tracking-wide bg-white px-3 z-1">
										{block.label}
									</p>
									<div className="w-full border-t border-zinc-400 -mt-8" />
								</div>
							)}

							<div className="flex justify-center gap-12 space-y-8 flex-wrap">
								{block.items.map((item) => {
									const pdfInfo = getPdfInfo(item.id);

									return (
										<div
											key={item.id}
											className="flex flex-col items-center gap-2"
										>
											{pdfInfo ? (
												<PasswordProtectedPDF
													id={item.id}
													logo={`${import.meta.env.BASE_URL}img/marcas/${item.name}`}
													pdf={`${import.meta.env.BASE_URL}pdfs/${pdfInfo.pdf}`}
													password={pdfInfo.password}
												/>
											) : (
												<>
													<img
														src={`${import.meta.env.BASE_URL}img/marcas/${item.name}`}
														className="object-contain opacity-40 h-14"
														alt={item.id}
													/>
													<span className="text-xs opacity-0 select-none">
														placeholder
													</span>
												</>
											)}
										</div>
									);
								})}
							</div>
						</div>
					))}
				</div>

				<div className="text-center text-[11px] text-gray-700 mt-10">
					{site.legalNotice}
				</div>
			</div>
		</section>
	);
}
