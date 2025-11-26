// src/sections/ProducersSection.tsx

import FieldRow from "@/components/FieldRow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProducersData {
	id: string;
	sectionTitle: string;
	intro: string;
	columns: string[][];
	images: string[];
}

interface Props {
	data: ProducersData;
	onChange: (value: ProducersData) => void;
}

export default function ProducersSection({ data, onChange }: Props) {
	function update<K extends keyof ProducersData>(
		key: K,
		value: ProducersData[K],
	) {
		onChange({ ...data, [key]: value });
	}

	const colTexts = data.columns.map((col) => col.join("\n"));
	const imagesText = data.images.join("\n");

	return (
		<Card>
			<CardHeader>
				<CardTitle>Feira de Produtores</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
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

				<FieldRow label="Introdução">
					<Textarea
						rows={3}
						value={data.intro}
						onChange={(e) => update("intro", e.target.value)}
					/>
				</FieldRow>

				<div className="grid grid-cols-1 md:md:grid-cols-2 gap-3">
					{colTexts.map((txt, idx) => (
						<FieldRow
							key={idx}
							label={`Coluna ${idx + 1}`}
							description="Um produtor por linha."
						>
							<Textarea
								rows={8}
								value={txt}
								onChange={(e) => {
									const newCols = [...data.columns];
									newCols[idx] = e.target.value
										.split(/\n/)
										.map((s) => s.trim())
										.filter(Boolean);
									update("columns", newCols);
								}}
							/>
						</FieldRow>
					))}
				</div>

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
			</CardContent>
		</Card>
	);
}
