// src/sections/SiteSection.tsx

import FieldRow from "@/components/FieldRow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface SiteData {
	title: string;
	description: string;
	logoUrl: string;
	footerLogoUrl: string;
	footerLabel: string;
	legalNotice: string;
}

interface Props {
	data: SiteData;
	onChange: (value: SiteData) => void;
}

export default function SiteSection({ data, onChange }: Props) {
	function update<K extends keyof SiteData>(key: K, value: SiteData[K]) {
		onChange({ ...data, [key]: value });
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Configurações do Site</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4 columns-1 md:columns-2 gap-8">
				<FieldRow label="Título do site">
					<Input
						value={data.title}
						onChange={(e) => update("title", e.target.value)}
					/>
				</FieldRow>

				<FieldRow label="Descrição" description="Descrição usada na página.">
					<Textarea
						rows={3}
						value={data.description}
						onChange={(e) => update("description", e.target.value)}
					/>
				</FieldRow>

				<FieldRow label="Logo principal (arquivo)">
					<Input
						value={data.logoUrl}
						onChange={(e) => update("logoUrl", e.target.value)}
						placeholder="ex: logoRG_neg.png"
					/>
				</FieldRow>

				<FieldRow label="Logo do rodapé (arquivo)">
					<Input
						value={data.footerLogoUrl}
						onChange={(e) => update("footerLogoUrl", e.target.value)}
						placeholder="ex: logooglobo100.png"
					/>
				</FieldRow>

				<FieldRow label="Rótulo do rodapé">
					<Input
						value={data.footerLabel}
						onChange={(e) => update("footerLabel", e.target.value)}
					/>
				</FieldRow>

				<FieldRow label="Aviso legal">
					<Textarea
						rows={2}
						value={data.legalNotice}
						onChange={(e) => update("legalNotice", e.target.value)}
					/>
				</FieldRow>
			</CardContent>
		</Card>
	);
}
