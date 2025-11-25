import { useEffect, useState } from "react";
import { useContent } from "@/hooks/useContent";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";

export default function Header() {
	const { content } = useContent();
	const { site, menu } = content;

	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		// biome-ignore lint/nursery/useUniqueElementIds: <explanation>
		<header
			id="home"
			className="
        sticky top-0 z-40 
        bg-red-600/95 
        backdrop-blur 
        border-b border-neutral-800 
        transition-all duration-300
      "
		>
			<div className="container mx-auto px-4 py-3 flex flex-col gap-6">
				{/* LOGO — só aparece antes do scroll */}
				{!scrolled && (
					<img
						src={`${import.meta.env.BASE_URL}img/${site.logoUrl}`}
						alt={site.title}
						className="w-36 h-auto transition-all duration-300"
					/>
				)}

				{/* MENU DESKTOP */}
				<nav className="hidden md:flex gap-6 text-neutral-100 ">
					{menu.map((item) => (
						<ScrollLink
							key={item.href}
							to={item.href.replace("#", "")} // remove o "#"
							smooth={true}
							duration={500}
							offset={-80} // ajuste para compensar o header
							spy={true}
							className="
                cursor-pointer
                hover:text-yellow-300 
                text-sm transition-colors 
                font-title uppercase tracking-wide
              "
						>
							{item.label}
						</ScrollLink>
					))}
				</nav>

				{/* MENU MOBILE – Shadcn Sheet */}
				<div className="md:hidden ml-auto">
					<Sheet>
						<SheetTrigger>
							<Menu className="text-white w-7 h-7" />
						</SheetTrigger>

						<SheetContent side="right" className="bg-red-700 text-white p-6">
							<nav className="flex flex-col gap-6 mt-10">
								{menu.map((item) => (
									<ScrollLink
										key={item.href}
										to={item.href.replace("#", "")}
										smooth={true}
										duration={500}
										offset={-70}
										spy={true}
										className="
                      text-lg font-title uppercase tracking-wide
                      hover:text-yellow-300 transition-colors
                      cursor-pointer
                    "
									>
										{item.label}
									</ScrollLink>
								))}
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
