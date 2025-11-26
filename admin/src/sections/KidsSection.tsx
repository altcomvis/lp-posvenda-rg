// src/sections/KidsSection.tsx

import FieldRow from "@/components/FieldRow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface KidsData {
	id: string;
	sectionTitle: string;
	intro: string;
	images: string[];
}

interface Props {
	data: KidsData;
	onChange: (value: KidsData) => void;
}

export default function KidsSection({ data, onChange }: Props) {
	function update<K extends keyof KidsData>(key: K, value: KidsData[K]) {
		onChange({ ...data, [key]: value });
	}

	const imagesText = data.images.join("\n");

	return (
		<Card>
			<CardHeader>
				<CardTitle>Espaço Kids</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid md:grid-cols-2 gap-4">
					<FieldRow label="ID (âncora)">
						<Input
							value={data.id}
							onChange={(e) => update("id", e.target.value)}
						/>
					</FieldRow>
					<FieldRow label="Título da seção">
						<Input
							value={data.sectionTitle}
							onChange={(e) => update("sectionTitle", e.target.value)}
						/>
					</FieldRow>
				</div>

				<div className="grid md:grid-cols-2 gap-4">
					<FieldRow label="Introdução">
						<Textarea
							rows={3}
							value={data.intro}
							onChange={(e) => update("intro", e.target.value)}
						/>
					</FieldRow>
					<FieldRow label="Imagens" description="Uma imagem por linha.">
						<Textarea
							rows={4}
							value={imagesText}
							onChange={(e) =>
								update(
									"images",
									e.target.value
										.split(/\n/)
										.map((s) => s.trim())
										.filter(Boolean),
								)
							}
						/>
					</FieldRow>
				</div>
			</CardContent>
		</Card>
	);
}
