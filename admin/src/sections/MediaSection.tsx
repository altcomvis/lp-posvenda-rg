// src/sections/MediaSection.tsx

import { X } from "lucide-react";
import FieldRow from "@/components/FieldRow";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface MediaItem {
	title: string;
	hidden: boolean;
	body: string;
}

interface MediaData {
	id: string;
	sectionTitle: string;
	items: MediaItem[];
	images: string[];
}

interface Props {
	data: MediaData;
	onChange: (value: MediaData) => void;
}

export default function MediaSection({ data, onChange }: Props) {
	function update<K extends keyof MediaData>(key: K, value: MediaData[K]) {
		onChange({ ...data, [key]: value });
	}

	function updateItem(index: number, partial: Partial<MediaItem>) {
		const clone = [...data.items];
		clone[index] = { ...clone[index], ...partial };
		update("items", clone);
	}

	function addItem() {
		update("items", [...data.items, { title: "", hidden: false, body: "" }]);
	}

	function removeItem(index: number) {
		update(
			"items",
			data.items.filter((_, i) => i !== index),
		);
	}

	const imagesText = data.images.join("\n");

	return (
		<Card>
			<CardHeader className="flex justify-between items-center">
				<CardTitle>Divulgação</CardTitle>
				<Button size="sm" variant="outline" onClick={addItem}>
					Adicionar bloco
				</Button>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid md:grid-cols-2 gap-4	pb-8">
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

				<div className="space-y-8 columns-1 md:columns-3 gap-8">
					{data.items.map((item, idx) => (
						<div
							key={idx}
							className="border relative break-inside-avoid rounded p-3 space-y-2"
						>
							<Button
								variant="ghost"
								size="sm"
								className="absolute top-0 right-0"
								onClick={() => removeItem(idx)}
							>
								<X className="h-4 w-4" />
							</Button>
							<FieldRow label="Título">
								<Input
									value={item.title}
									onChange={(e) => updateItem(idx, { title: e.target.value })}
								/>
							</FieldRow>

							<div className="flex items-center justify-between">
								<span className="text-xs text-neutral-500">
									Ocultar por padrão?
								</span>
								<Switch
									checked={item.hidden}
									onCheckedChange={(checked) =>
										updateItem(idx, { hidden: checked })
									}
								/>
							</div>

							<FieldRow label="Texto">
								<Textarea
									rows={4}
									value={item.body}
									onChange={(e) => updateItem(idx, { body: e.target.value })}
								/>
							</FieldRow>
						</div>
					))}
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
