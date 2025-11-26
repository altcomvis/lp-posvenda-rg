// src/sections/AudienceSection.tsx

import { X } from "lucide-react";
import FieldRow from "@/components/FieldRow";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AudienceItem {
	icon: string;
	title: string;
	description: string;
}

interface AudienceData {
	id: string;
	sectionTitle: string;
	items: AudienceItem[];
}

interface Props {
	data: AudienceData;
	onChange: (value: AudienceData) => void;
}

export default function AudienceSection({ data, onChange }: Props) {
	function update<K extends keyof AudienceData>(
		key: K,
		value: AudienceData[K],
	) {
		onChange({ ...data, [key]: value });
	}

	function updateItem(index: number, partial: Partial<AudienceItem>) {
		const clone = [...data.items];
		clone[index] = { ...clone[index], ...partial };
		update("items", clone);
	}

	function addItem() {
		update("items", [...data.items, { icon: "", title: "", description: "" }]);
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
				<CardTitle>Perfil de Público</CardTitle>
				<Button size="sm" variant="outline" onClick={addItem}>
					Adicionar item
				</Button>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid md:grid-cols-2 gap-8 border-b pb-8">
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

				<div className="space-y-3 columns-1 md:columns-3 gap-8">
					{data.items.map((item, idx) => (
						<div
							key={idx}
							className="border relative rounded p-3 space-y-2 break-inside-avoid"
						>
							<Button
								variant="ghost"
								size="sm"
								className="absolute top-0 right-0"
								onClick={() => removeItem(idx)}
							>
								<X className="h-4 w-4" />
							</Button>
							<FieldRow label="Ícone (arquivo)">
								<Input
									value={item.icon}
									onChange={(e) => updateItem(idx, { icon: e.target.value })}
								/>
							</FieldRow>

							<FieldRow label="Título">
								<Input
									value={item.title}
									onChange={(e) => updateItem(idx, { title: e.target.value })}
								/>
							</FieldRow>

							<FieldRow label="Descrição">
								<Textarea
									rows={3}
									value={item.description}
									onChange={(e) =>
										updateItem(idx, { description: e.target.value })
									}
								/>
							</FieldRow>
						</div>
					))}

					{data.items.length === 0 && (
						<p className="text-xs text-neutral-500">Nenhum item cadastrado.</p>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
