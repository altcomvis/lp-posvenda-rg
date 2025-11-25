import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { type ValidationResult, validateContent } from "@/lib/validation";
import Login from "@/pages/Login";

// CONFIG
const OWNER = "SEU_USUARIO";
const REPO = "lp-posvenda-rg";
const BRANCH = "main";
const FILE_PATH = "content.json";

const RAW_URL = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${FILE_PATH}`;
const API_URL = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;

// Token vindo do .env
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_PAT;

// Base64 UTF-8
function encodeBase64(str: string): string {
	return btoa(unescape(encodeURIComponent(str)));
}

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
	kids: "Infantil",
	shows: "Shows",
	activations: "Ativações",
	media: "Divulgação",
	sponsors: "Patrocinadores",
};

export default function App() {
	const [authenticated, setAuthenticated] = useState(
		localStorage.getItem("admin-auth") === "true",
	);

	const [fullJson, setFullJson] = useState<any | null>(null);
	const [sectionTexts, setSectionTexts] = useState<Record<string, string>>({});
	const [activeTab, setActiveTab] = useState("overview");

	const [saving, setSaving] = useState(false);
	const [loading, setLoading] = useState(false);

	const [message, setMessage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const [validation, setValidation] = useState<ValidationResult>({
		valid: true,
		errors: [],
	});

	// ROTAS -----------------------------------------------

	if (!authenticated) {
		return (
			<Routes>
				<Route
					path="*"
					element={
						<Login
							onAuthenticated={() => setAuthenticated(true)}
							onLoadContent={handleLoad}
						/>
					}
				/>
			</Routes>
		);
	}

	return (
		<Routes>
			<Route path="/admin" element={renderAdmin()} />
			<Route path="*" element={<Navigate to="/admin" replace />} />
		</Routes>
	);

	// RENDER ADMIN ----------------------------------------

	function renderAdmin() {
		return (
			<div className="min-h-screen bg-neutral-950 text-neutral-50 p-6">
				<header className="flex justify-between mb-6 border-b border-red-900/40 pb-3">
					<h1 className="text-xl md:text-3xl font-bold text-red-500">
						Admin – Rio Gastronomia
					</h1>

					<Button variant="outline" onClick={handleLoad} disabled={loading}>
						{loading ? "Carregando..." : "Recarregar"}
					</Button>
				</header>

				{message && (
					<p className="text-emerald-400 border border-emerald-700 p-2 mb-4 rounded text-xs">
						{message}
					</p>
				)}
				{error && (
					<p className="text-red-400 border border-red-700 p-2 mb-4 rounded text-xs">
						{error}
					</p>
				)}

				{!fullJson ? renderPlaceholder() : renderTabs()}
			</div>
		);
	}

	// PLACEHOLDER
	function renderPlaceholder() {
		return (
			<Card className="bg-neutral-900 border-neutral-800">
				<CardHeader>
					<CardTitle>Aguardando carregamento</CardTitle>
				</CardHeader>
				<CardContent>
					Clique em “Recarregar” para carregar o conteúdo do GitHub.
				</CardContent>
			</Card>
		);
	}

	// TABS
	function renderTabs() {
		const sections = Object.keys(fullJson || {});

		return (
			<Tabs value={activeTab} onValueChange={setActiveTab}>
				<TabsList className="bg-neutral-900 border border-neutral-800 flex flex-wrap">
					<TabsTrigger value="overview">Visão Geral</TabsTrigger>
					{sections.map((s) => (
						<TabsTrigger key={s} value={s}>
							{SECTION_LABELS[s] ?? s}
						</TabsTrigger>
					))}
				</TabsList>

				{/* OVERVIEW */}
				<TabsContent value="overview" className="mt-4">
					<Card className="bg-neutral-900 border-neutral-800">
						<CardHeader>
							<CardTitle>Estado do JSON</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{validation.valid ? (
								<p className="text-emerald-400 text-sm">Estrutura válida</p>
							) : (
								<div className="text-red-400 text-sm">
									<p>Erros:</p>
									<ul className="text-xs list-disc ml-4 mt-1">
										{validation.errors.map((e, i) => (
											<li key={i}>{e}</li>
										))}
									</ul>
								</div>
							)}

							<Button
								className="bg-red-600"
								onClick={handleSaveAll}
								disabled={saving}
							>
								{saving ? "Salvando..." : "Salvar tudo no GitHub"}
							</Button>
						</CardContent>
					</Card>
				</TabsContent>

				{/* SEÇÕES */}
				{sections.map((section) => (
					<TabsContent key={section} value={section} className="mt-4">
						<Card className="bg-neutral-900 border-neutral-800">
							<CardHeader>
								<CardTitle>{SECTION_LABELS[section] ?? section}</CardTitle>
							</CardHeader>

							<CardContent className="space-y-3">
								<ScrollArea className="h-[400px] border border-neutral-800">
									<Textarea
										className="h-full bg-neutral-950 text-xs font-mono"
										value={sectionTexts[section]}
										onChange={(e) =>
											setSectionTexts((prev) => ({
												...prev,
												[section]: e.target.value,
											}))
										}
									/>
								</ScrollArea>

								<Button
									variant="outline"
									onClick={() => handleApplySection(section)}
								>
									Aplicar alterações
								</Button>
							</CardContent>
						</Card>
					</TabsContent>
				))}
			</Tabs>
		);
	}

	// LOGIC: LOAD JSON
	async function handleLoad() {
		setLoading(true);
		setError(null);
		setMessage(null);

		try {
			const res = await fetch(RAW_URL);
			if (!res.ok) throw new Error("Erro ao carregar conteúdo.");

			const json = await res.json();
			setFullJson(json);

			const texts: Record<string, string> = {};
			for (const key of Object.keys(json)) {
				texts[key] = JSON.stringify(json[key], null, 2);
			}
			setSectionTexts(texts);

			setValidation(validateContent(json));
			setMessage("Conteúdo carregado.");
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}

	// LOGIC: APPLY SECTION
	function handleApplySection(section: string) {
		try {
			const parsed = JSON.parse(sectionTexts[section]);

			const newJson = { ...fullJson, [section]: parsed };
			setFullJson(newJson);

			setValidation(validateContent(newJson));
			setMessage(`Seção '${section}' atualizada.`);
		} catch {
			setError(`JSON inválido em '${section}'.`);
		}
	}

	// LOGIC: SAVE TO GITHUB
	async function handleSaveAll() {
		if (!validation.valid) {
			setError("Estrutura inválida. Corrija antes de salvar.");
			return;
		}

		setSaving(true);

		try {
			// Obter SHA
			const getRes = await fetch(API_URL, {
				headers: {
					Authorization: `Bearer ${GITHUB_TOKEN}`,
					Accept: "application/vnd.github+json",
				},
			});
			if (!getRes.ok) throw new Error("Erro ao buscar SHA.");

			const file = await getRes.json();
			const sha = file.sha;

			// Criar conteúdo final
			const newContent = JSON.stringify(fullJson, null, 2);

			// Enviar para GitHub
			const putRes = await fetch(API_URL, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${GITHUB_TOKEN}`,
					Accept: "application/vnd.github+json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: "Atualização via Admin",
					content: encodeBase64(newContent),
					sha,
					branch: BRANCH,
				}),
			});

			if (!putRes.ok) throw new Error("Erro ao salvar no GitHub.");

			setMessage("Conteúdo salvo com sucesso!");
		} catch (err: any) {
			setError(err.message);
		} finally {
			setSaving(false);
		}
	}
}
