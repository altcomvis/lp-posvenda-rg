import { useState } from "react";

const GITHUB_USER = "SEU_USER";
const GITHUB_REPO = "SEU_REPO";
const GITHUB_BRANCH = "main";
const FILE_PATH = "content.json";

export function useGithubContent() {
	const [content, setContent] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);

	const RAW_URL = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${FILE_PATH}`;
	const API_URL = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${FILE_PATH}`;

	async function loadFromGithub() {
		setLoading(true);
		try {
			const res = await fetch(RAW_URL);
			const data = await res.json();
			setContent(data);
		} catch (err) {
			console.error("Erro ao carregar conteúdo:", err);
			alert("Erro ao carregar conteúdo do GitHub");
		} finally {
			setLoading(false);
		}
	}

	async function saveToGithub(updated: any, token: string) {
		setSaving(true);

		try {
			const getRes = await fetch(API_URL, {
				headers: { Authorization: `Bearer ${token}` },
			});

			const fileData = await getRes.json();
			const sha = fileData.sha;

			await fetch(API_URL, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: "Atualização via Admin",
					content: btoa(JSON.stringify(updated, null, 2)),
					sha,
					branch: GITHUB_BRANCH,
				}),
			});

			alert("Arquivo atualizado no GitHub!");
		} catch (err) {
			console.error("Erro ao salvar:", err);
			alert("Erro ao salvar no GitHub");
		} finally {
			setSaving(false);
		}
	}

	return { content, setContent, loadFromGithub, saveToGithub, loading, saving };
}
