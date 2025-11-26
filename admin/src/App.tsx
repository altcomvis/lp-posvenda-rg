// src/App.tsx
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import JsonStatus from "@/components/JsonStatus";
import { Button } from "@/components/ui/button";
// Sidebar
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { loadContent, saveContent } from "@/lib/github";
import { validateContent } from "@/lib/validation";
import Login from "@/pages/Login";
import ActivationsSection from "@/sections/ActivationsSection";
import AudienceSection from "@/sections/AudienceSection";
import AuditoriumsSection from "@/sections/AuditoriumsSection";
import AwardsSection from "@/sections/AwardsSection";
import EstablishmentsSection from "@/sections/EstablishmentsSection";
import HeroSection from "@/sections/HeroSection";
import KidsSection from "@/sections/KidsSection";
import MediaSection from "@/sections/MediaSection";
import MenuSection from "@/sections/MenuSection";
import NumbersSection from "@/sections/NumbersSection";
import ProducersSection from "@/sections/ProducersSection";
import ShowsSection from "@/sections/ShowsSection";
import SiteSection from "@/sections/SiteSection";
import SponsorsSection from "@/sections/SponsorsSection";
import { Badge } from "./components/ui/badge";

const SECTION_LABELS: Record<string, string> = {
	site: "Site",
	menu: "Menu",
	hero: "Hero",
	numbers: "Números",
	audience: "Público",
	awards: "Prêmio",
	auditoriums: "Auditórios",
	establishments: "Estabelecimentos",
	producers: "Produtores",
	kids: "Kids",
	shows: "Shows",
	activations: "Ativações",
	media: "Divulgação",
	sponsors: "Patrocinadores",
};

export default function App() {
	const [authenticated, setAuthenticated] = useState(
		localStorage.getItem("admin-auth") === "true",
	);

	const [content, setContent] = useState<any | null>(null);
	const [activeSection, setActiveSection] = useState<string>("overview");

	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);

	const [validation, setValidation] = useState({
		valid: true,
		errors: [] as string[],
	});

	const [message, setMessage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (authenticated && !content) {
			handleLoad();
		}
	}, [authenticated]);

	if (!authenticated) {
		return (
			<Login
				onAuthenticated={() => {
					localStorage.setItem("admin-auth", "true");
					setAuthenticated(true);
				}}
			/>
		);
	}

	async function handleLoad() {
		setLoading(true);
		setError(null);
		setMessage(null);

		try {
			const data = await loadContent();
			setContent(data);

			const validationResult = validateContent(data);
			setValidation(validationResult);

			setMessage("Conteúdo carregado com sucesso.");
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}

	async function handleSave() {
		if (!validation.valid) {
			setError("JSON inválido. Corrija antes de salvar.");
			return;
		}

		setSaving(true);
		setMessage(null);
		setError(null);

		try {
			await saveContent(content);
			setMessage("Conteúdo salvo no GitHub com sucesso.");
		} catch (err: any) {
			setError(err.message);
		} finally {
			setSaving(false);
		}
	}

	function update(section: string) {
		return (newValue: any) => {
			const updated = { ...content, [section]: newValue };
			setContent(updated);
			setValidation(validateContent(updated));
		};
	}

	function renderSection() {
		if (!content) return null;

		switch (activeSection) {
			case "site":
				return <SiteSection data={content.site} onChange={update("site")} />;

			case "menu":
				return <MenuSection data={content.menu} onChange={update("menu")} />;

			case "hero":
				return <HeroSection data={content.hero} onChange={update("hero")} />;

			case "numbers":
				return (
					<NumbersSection data={content.numbers} onChange={update("numbers")} />
				);

			case "audience":
				return (
					<AudienceSection
						data={content.audience}
						onChange={update("audience")}
					/>
				);

			case "awards":
				return (
					<AwardsSection data={content.awards} onChange={update("awards")} />
				);

			case "auditoriums":
				return (
					<AuditoriumsSection
						data={content.auditoriums}
						onChange={update("auditoriums")}
					/>
				);

			case "establishments":
				return (
					<EstablishmentsSection
						data={content.establishments}
						onChange={update("establishments")}
					/>
				);

			case "producers":
				return (
					<ProducersSection
						data={content.producers}
						onChange={update("producers")}
					/>
				);

			case "kids":
				return <KidsSection data={content.kids} onChange={update("kids")} />;

			case "shows":
				return <ShowsSection data={content.shows} onChange={update("shows")} />;

			case "activations":
				return (
					<ActivationsSection
						data={content.activations}
						onChange={update("activations")}
					/>
				);

			case "media":
				return <MediaSection data={content.media} onChange={update("media")} />;

			case "sponsors":
				return (
					<SponsorsSection
						data={content.sponsors}
						onChange={update("sponsors")}
					/>
				);
		}
	}

	return (
		<SidebarProvider>
			<AppSidebar
				active={activeSection}
				setActive={setActiveSection}
				sections={SECTION_LABELS}
				onSave={handleSave}
				saving={saving}
				validation={validation}
			/>

			<main className="w-full ">
				<header className="flex justify-between mb-4 p-4 bg-sidebar">
					<SidebarTrigger />
					<h1 className="text-xl md:text-3xl font-bold text-neutral-500">
						Admin | Pós Venda Rio Gastronomia
					</h1>

					<Button variant="outline" onClick={handleLoad} disabled={loading}>
						{loading ? "Carregando..." : "Recarregar"}
					</Button>
				</header>

				<div className="pl-6">
					{message && <Badge variant="secondary">{message}</Badge>}
					{error && <Badge variant="destructive">{error}</Badge>}
				</div>
				<div className="p-6">{renderSection()}</div>
			</main>
		</SidebarProvider>
	);
}
