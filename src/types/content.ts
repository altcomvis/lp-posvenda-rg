export interface MenuItem {
	label: string;
	href: string;
}

export interface NumbersMetric {
	value: string;
	label: string;
}

export interface AudienceItem {
	icon: string;
	title: string;
	value: string;
	description: string;
}

export interface AwardData {
	id: string;
	sectionTitle: string;
	paragraphs: string[];
	images: string[];
}

export interface AuditoriumItem {
	name: string;
	description: string;
	images: string[];
}

export interface EstablishmentAccordionItem {
	title: string;
	columns: string[][];
	images: string[];
}

export interface MediaItem {
	title: string;
	hidden: boolean;
	body: string;
}

export interface ShowItem {
	name: string;
	image: string;
}

export interface ContentData {
	site: {
		title: string;
		description: string;
		logoUrl: string;
		footerLogoUrl: string;
		footerLabel: string;
		legalNotice: string;
	};
	menu: MenuItem[];
	hero: {
		id: string;
		videoUrl: string;
		title: string;
		backgroundClass?: string;
	};
	numbers: {
		id: string;
		sectionTitle: string;
		highlightTitle: string;
		introParagraphs: string[];
		metrics: NumbersMetric[];
	};
	audience: {
		id: string;
		sectionTitle: string;
		items: AudienceItem[];
	};
	awards: AwardData;
	auditoriums: {
		id: string;
		sectionTitle: string;
		name: string;
		description: string;
		items: AuditoriumItem[];
	};
	establishments: {
		id: string;
		sectionTitle: string;
		intro: string;
		accordion: EstablishmentAccordionItem[];
	};
	producers: {
		id: string;
		sectionTitle: string;
		intro: string;
		columns: string[][];
		images: string[];
	};
	kids: {
		id: string;
		sectionTitle: string;
		intro: string;
		images: string[];
	};
	shows: {
		id: string;
		sectionTitle: string;
		intro: string;
		items: ShowItem[];
	};
	activations: {
		id: string;
		sectionTitle: string;
		intro: string;
		images: string[];
	};
	media: {
		id: string;
		sectionTitle: string;
		items: MediaItem[];
		images: string[];
	};
	sponsors: {
		id: string;
		sectionTitle: string;
		rodapeImagem?: string;
		blocks: SponsorBlock[];
	};
}
export interface SponsorItem {
	id: string;
	name: string;
	brandRef: string;
}

export interface SponsorBlock {
	id: string;
	label: string;
	items: SponsorItem[];
}

export interface ProtectedPdf {
	id: string;
	pdf: string;
	password: string;
}
