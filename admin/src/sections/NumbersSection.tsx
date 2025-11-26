// src/sections/NumbersSection.tsx

import { X } from "lucide-react";
import FieldRow from "@/components/FieldRow";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface NumbersMetric {
	value: string;
	label: string;
}

interface NumbersData {
	id: string;
	sectionTitle: string;
	highlightTitle: string;
	introParagraphs: string[];
	metrics: NumbersMetric[];
}

interface Props {
	data: NumbersData;
	onChange: (value: NumbersData) => void;
}

export default function NumbersSection({ data, onChange }: Props) {
	function update<K extends keyof NumbersData>(key: K, value: NumbersData[K]) {
		onChange({ ...data, [key]: value });
	}

	function updateMetric(index: number, partial: Partial<NumbersMetric>) {
		const clone = [...data.metrics];
		clone[index] = { ...clone[index], ...partial };
		update("metrics", clone);
	}

	function addMetric() {
		update("metrics", [...data.metrics, { value: "", label: "" }]);
	}

	function removeMetric(index: number) {
		update(
			"metrics",
			data.metrics.filter((_, i) => i !== index),
		);
	}

	const introText = data.introParagraphs.join("\n\n");

	function handleIntroChange(text: string) {
		const paragraphs = text
			.split(/\n{2,}/)
			.map((p) => p.trim())
			.filter(Boolean);
		update("introParagraphs", paragraphs);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Números</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="w-full grid grid-cols-3 gap-4">
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
					<FieldRow label="Título de destaque">
						<Input
							value={data.highlightTitle}
							onChange={(e) => update("highlightTitle", e.target.value)}
						/>
					</FieldRow>
				</div>

				<FieldRow
					label="Parágrafos de introdução"
					description="Separe parágrafos com uma linha em branco."
				>
					<Textarea
						rows={6}
						value={introText}
						onChange={(e) => handleIntroChange(e.target.value)}
					/>
				</FieldRow>

				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<span className="text-xs uppercase tracking-wide text-neutral-500">
							Métricas
						</span>
						<Button size="sm" variant="outline" onClick={addMetric}>
							Adicionar métrica
						</Button>
					</div>

					<div className="space-y-2 columns-1 md:columns-3 gap-8">
						{data.metrics.map((metric, idx) => (
							<div
								key={idx}
								className="border break-inside-avoid flex justify-between rounded p-3 gap-1 "
							>
								<div className="space-y-4 w-full">
									<Input
										placeholder="Valor"
										value={metric.value}
										onChange={(e) =>
											updateMetric(idx, { value: e.target.value })
										}
									/>
									<Input
										placeholder="Descrição"
										value={metric.label}
										onChange={(e) =>
											updateMetric(idx, { label: e.target.value })
										}
									/>
								</div>

								<Button
									variant="ghost"
									size="sm"
									onClick={() => removeMetric(idx)}
								>
									<X className="h-4 w-4" />
								</Button>
							</div>
						))}

						{data.metrics.length === 0 && (
							<p className="text-xs text-neutral-500">
								Nenhuma métrica cadastrada.
							</p>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
