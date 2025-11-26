import { X } from "lucide-react";
import FieldRow from "@/components/FieldRow";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EstablishmentAccordionItem {
	title: string;
	columns: string[][];
	images: string[];
}

interface EstablishmentsData {
	id: string;
	sectionTitle: string;
	intro: string;
	accordion: EstablishmentAccordionItem[];
}

interface Props {
	data: EstablishmentsData;
	onChange: (value: EstablishmentsData) => void;
}

export default function EstablishmentsSection({ data, onChange }: Props) {
	function update<K extends keyof EstablishmentsData>(
		key: K,
		value: EstablishmentsData[K],
	) {
		onChange({ ...data, [key]: value });
	}

	function updateItem(
		index: number,
		partial: Partial<EstablishmentAccordionItem>,
	) {
		const clone = [...data.accordion];
		clone[index] = { ...clone[index], ...partial };
		update("accordion", clone);
	}

	function addItem() {
		update("accordion", [
			...data.accordion,
			{ title: "", columns: [[]], images: [] },
		]);
	}

	function removeItem(index: number) {
		update(
			"accordion",
			data.accordion.filter((_, i) => i !== index),
		);
	}

	return (
		<Card>
			<CardHeader className="flex justify-between items-center">
				<CardTitle>Estabelecimentos</CardTitle>
				<Button size="sm" variant="outline" onClick={addItem}>
					Adicionar bloco
				</Button>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid md:grid-cols-2 gap-4	">
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

				<FieldRow label="Introdução">
					<Textarea
						rows={3}
						value={data.intro}
						onChange={(e) => update("intro", e.target.value)}
					/>
				</FieldRow>

				<div className="space-y-3">
					{data.accordion.map((acc, idx) => {
						const colTexts = acc.columns.map((col) => col.join("\n"));
						const imagesText = acc.images.join("\n");

						return (
							<div key={idx} className="border relative rounded p-3 space-y-2">
								<Button
									variant="ghost"
									size="sm"
									className="absolute top-0 right-0"
									onClick={() => removeItem(idx)}
								>
									<X className="h-4 w-4" />
								</Button>
								<FieldRow label="Título do bloco">
									<Input
										value={acc.title}
										onChange={(e) => updateItem(idx, { title: e.target.value })}
									/>
								</FieldRow>

								<div className="grid grid-cols-1 md:md:grid-cols-2 gap-3">
									{colTexts.map((txt, colIdx) => (
										<FieldRow
											key={colIdx}
											label={`Coluna ${colIdx + 1}`}
											description="Um estabelecimento por linha."
										>
											<Textarea
												rows={8}
												value={txt}
												onChange={(e) => {
													const newColumns = [...acc.columns];
													newColumns[colIdx] = e.target.value
														.split(/\n/)
														.map((s) => s.trim())
														.filter(Boolean);
													updateItem(idx, { columns: newColumns });
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
											updateItem(idx, {
												images: e.target.value
													.split(/\n/)
													.map((s) => s.trim())
													.filter(Boolean),
											})
										}
									/>
								</FieldRow>
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
}
