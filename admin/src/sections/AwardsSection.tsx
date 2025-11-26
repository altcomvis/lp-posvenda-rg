// src/sections/AwardsSection.tsx

import FieldRow from "@/components/FieldRow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AwardsData {
	id: string;
	sectionTitle: string;
	paragraphs: string[];
	images: string[];
}

interface Props {
	data: AwardsData;
	onChange: (value: AwardsData) => void;
}

export default function AwardsSection({ data, onChange }: Props) {
	function update<K extends keyof AwardsData>(key: K, value: AwardsData[K]) {
		onChange({ ...data, [key]: value });
	}

	const paragraphsText = data.paragraphs.join("\n\n");
	const imagesText = data.images.join("\n");

	return (
		<Card>
			<CardHeader>
				<CardTitle>Prêmio</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="columns-1 gap-4 md:columns-2">
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

				<FieldRow
					label="Parágrafos"
					description="Separe parágrafos com uma linha em branco."
				>
					<Textarea
						rows={10}
						value={paragraphsText}
						onChange={(e) =>
							update(
								"paragraphs",
								e.target.value
									.split(/\n{2,}/)
									.map((p) => p.trim())
									.filter(Boolean),
							)
						}
					/>
				</FieldRow>

				<FieldRow
					label="Imagens"
					description="Uma imagem por linha (apenas o arquivo)."
				>
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
			</CardContent>
		</Card>
	);
}
