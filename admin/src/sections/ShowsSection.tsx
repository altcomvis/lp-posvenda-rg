// src/sections/ShowsSection.tsx

import { X } from "lucide-react";
import FieldRow from "@/components/FieldRow";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ShowItem {
	name: string;
	image: string;
}

interface ShowsData {
	id: string;
	sectionTitle: string;
	intro: string;
	items: ShowItem[];
}

interface Props {
	data: ShowsData;
	onChange: (value: ShowsData) => void;
}

export default function ShowsSection({ data, onChange }: Props) {
	function update<K extends keyof ShowsData>(key: K, value: ShowsData[K]) {
		onChange({ ...data, [key]: value });
	}

	function updateItem(index: number, partial: Partial<ShowItem>) {
		const clone = [...data.items];
		clone[index] = { ...clone[index], ...partial };
		update("items", clone);
	}

	function addItem() {
		update("items", [...data.items, { name: "", image: "" }]);
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
				<CardTitle>Shows</CardTitle>
				<Button size="sm" variant="outline" onClick={addItem}>
					Adicionar show
				</Button>
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

				<FieldRow label="Introdução">
					<Textarea
						rows={3}
						value={data.intro}
						onChange={(e) => update("intro", e.target.value)}
					/>
				</FieldRow>

				<div className="space-y-3 columns-1 md:columns-3 gap-8">
					{data.items.map((item, idx) => (
						<div
							key={idx}
							className="border break-inside-avoid relative rounded p-3 space-y-2"
						>
							<Button
								variant="ghost"
								size="sm"
								className="absolute top-0 right-0"
								onClick={() => removeItem(idx)}
							>
								<X className="h-4 w-4" />
							</Button>
							<FieldRow label="Nome do show">
								<Input
									value={item.name}
									onChange={(e) => updateItem(idx, { name: e.target.value })}
								/>
							</FieldRow>

							<FieldRow label="Imagem (arquivo)">
								<Input
									value={item.image}
									onChange={(e) => updateItem(idx, { image: e.target.value })}
								/>
							</FieldRow>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
