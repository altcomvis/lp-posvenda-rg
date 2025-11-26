// src/lib/github.ts
const OWNER = "altcomvis";
const REPO = "lp-posvenda-rg";
const BRANCH = "main";
const FILE_PATH = "content.json";

const RAW_URL = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${FILE_PATH}`;
const API_URL = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_PAT;

// Base64 UTF-8
function encodeBase64(str: string): string {
	return btoa(unescape(encodeURIComponent(str)));
}

export async function loadContent(): Promise<any> {
	const res = await fetch(RAW_URL);
	if (!res.ok) {
		throw new Error("Erro ao carregar conteúdo do GitHub.");
	}
	return res.json();
}

export async function saveContent(content: any): Promise<void> {
	if (!GITHUB_TOKEN) {
		throw new Error("Token do GitHub (VITE_GITHUB_PAT) não configurado.");
	}

	// Buscar SHA atual
	const getRes = await fetch(API_URL, {
		headers: {
			Authorization: `Bearer ${GITHUB_TOKEN}`,
			Accept: "application/vnd.github+json",
		},
	});

	if (!getRes.ok) {
		throw new Error("Erro ao buscar SHA do arquivo no GitHub.");
	}

	const fileData = await getRes.json();
	const sha = fileData.sha;

	const newContent = JSON.stringify(content, null, 2);

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

	if (!putRes.ok) {
		throw new Error("Erro ao salvar conteúdo no GitHub.");
	}
}
