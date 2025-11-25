// admin/src/lib/validation.ts

export interface ValidationResult {
	valid: boolean;
	errors: string[];
}

export function validateContent(data: any): ValidationResult {
	const errors: string[] = [];

	if (!data || typeof data !== "object") {
		errors.push("O JSON raiz deve ser um objeto.");
		return { valid: false, errors };
	}

	const ensure = (cond: boolean, msg: string) => {
		if (!cond) errors.push(msg);
	};

	// site
	ensure(
		typeof data.site === "object",
		"A seção 'site' deve existir e ser um objeto.",
	);
	if (data.site) {
		ensure(
			typeof data.site.title === "string",
			"site.title deve ser uma string.",
		);
		ensure(
			typeof data.site.description === "string",
			"site.description deve ser uma string.",
		);
		ensure(
			typeof data.site.logoUrl === "string",
			"site.logoUrl deve ser uma string.",
		);
	}

	// hero
	ensure(
		typeof data.hero === "object",
		"A seção 'hero' deve existir e ser um objeto.",
	);
	if (data.hero) {
		ensure(typeof data.hero.id === "string", "hero.id deve ser uma string.");
		ensure(
			typeof data.hero.videoUrl === "string",
			"hero.videoUrl deve ser uma string.",
		);
		ensure(
			typeof data.hero.title === "string",
			"hero.title deve ser uma string.",
		);
	}

	// numbers
	ensure(
		typeof data.numbers === "object",
		"A seção 'numbers' deve existir e ser um objeto.",
	);
	if (data.numbers) {
		ensure(
			Array.isArray(data.numbers.metrics),
			"numbers.metrics deve ser um array.",
		);
	}

	// audience
	ensure(
		typeof data.audience === "object",
		"A seção 'audience' deve existir e ser um objeto.",
	);
	if (data.audience) {
		ensure(
			Array.isArray(data.audience.items),
			"audience.items deve ser um array.",
		);
	}

	// awards
	ensure(
		typeof data.awards === "object",
		"A seção 'awards' deve existir e ser um objeto.",
	);

	// auditoriums
	ensure(
		typeof data.auditoriums === "object",
		"A seção 'auditoriums' deve existir e ser um objeto.",
	);

	// establishments
	ensure(
		typeof data.establishments === "object",
		"A seção 'establishments' deve existir e ser um objeto.",
	);

	// producers
	ensure(
		typeof data.producers === "object",
		"A seção 'producers' deve existir e ser um objeto.",
	);

	// kids
	ensure(
		typeof data.kids === "object",
		"A seção 'kids' deve existir e ser um objeto.",
	);

	// shows
	ensure(
		typeof data.shows === "object",
		"A seção 'shows' deve existir e ser um objeto.",
	);

	// activations
	ensure(
		typeof data.activations === "object",
		"A seção 'activations' deve existir e ser um objeto.",
	);

	// media
	ensure(
		typeof data.media === "object",
		"A seção 'media' deve existir e ser um objeto.",
	);

	// sponsors
	ensure(
		typeof data.sponsors === "object",
		"A seção 'sponsors' deve existir e ser um objeto.",
	);

	return { valid: errors.length === 0, errors };
}
