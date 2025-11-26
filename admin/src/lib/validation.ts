// src/lib/validation.ts
export interface ValidationResult {
	valid: boolean;
	errors: string[];
}

const REQUIRED_SECTIONS = [
	"site",
	"menu",
	"hero",
	"numbers",
	"audience",
	"awards",
	"auditoriums",
	"establishments",
	"producers",
	"kids",
	"shows",
	"activations",
	"media",
	"sponsors",
];

export function validateContent(data: any): ValidationResult {
	const errors: string[] = [];

	if (!data || typeof data !== "object") {
		errors.push("O conteúdo raiz não é um objeto JSON válido.");
		return { valid: false, errors };
	}

	for (const section of REQUIRED_SECTIONS) {
		if (!(section in data)) {
			errors.push(`Seção obrigatória ausente: '${section}'.`);
		}
	}

	if (data.site) {
		if (!data.site.title) errors.push("site.title é obrigatório.");
		if (!data.site.description) errors.push("site.description é obrigatório.");
	}

	if (data.menu && !Array.isArray(data.menu)) {
		errors.push("menu deve ser um array.");
	}

	if (data.hero && !data.hero.title) {
		errors.push("hero.title é obrigatório.");
	}

	if (data.numbers && !Array.isArray(data.numbers.metrics)) {
		errors.push("numbers.metrics deve ser um array.");
	}

	return {
		valid: errors.length === 0,
		errors,
	};
}
