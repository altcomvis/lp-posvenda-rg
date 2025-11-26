// src/sections/AuditoriumsSection.tsx

import FieldRow from "@/components/FieldRow";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AuditoriumItem {
	name: string;
	capacity: string;
	description: string;
	images: string[];
}

interface AuditoriumsData {
	id: string;
	sectionTitle: string;
	items: AuditoriumItem[];
}

interface Props {
	data: AuditoriumsData;
	onChange: (value: AuditoriumsData) => void;
}

export default function AuditoriumsSection({ data, onChange }: Props) {
	function update<K extends keyof AuditoriumsData>(
		key: K,
		value: AuditoriumsData[K],
	) {
		onChange({ ...data, [key]: value });
	}

	function updateItem(index: number, partial: Partial<AuditoriumItem>) {
		const clone = [...data.items];
		clone[index] = { ...clone[index], ...partial };
		update("items", clone);
	}

	function addItem() {
		update("items", [
			...data.items,
			{ name: "", capacity: "", description: "", images: [] },
		]);
	}

	function removeItem(index: number) {
		update(
			"items",
			data.items.filter((_, i) => i !== index),
		);
	}

	return (
		<Card>
			<CardHeader className="flex justify-between items-center">
				<CardTitle>Auditórios</CardTitle>
				<Button size="sm" variant="outline" onClick={addItem}>
					Adicionar auditório
				</Button>
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

				<div className="space-y-3">
					{data.items.map((aud, idx) => {
						const imagesText = aud.images.join("\n");

						return (
							<div key={idx} className="border  rounded p-3 space-y-2">
								<div className="grid grid-cols-2 gap-4">
									<FieldRow label="Nome">
										<Input
											value={aud.name}
											onChange={(e) =>
												updateItem(idx, { name: e.target.value })
											}
										/>
									</FieldRow>
									<FieldRow label="Capacidade">
										<Input
											value={aud.capacity}
											onChange={(e) =>
												updateItem(idx, { capacity: e.target.value })
											}
										/>
									</FieldRow>
								</div>

								<div className="grid md:grid-cols-2 gap-4">
									<FieldRow label="Descrição">
										<Textarea
											rows={3}
											value={aud.description}
											onChange={(e) =>
												updateItem(idx, { description: e.target.value })
											}
										/>
									</FieldRow>
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

								<Button variant="secondary" onClick={() => removeItem(idx)}>
									Remover auditório
								</Button>
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
}
