// src/sections/SponsorsSection.tsx

import { X } from "lucide-react";
import FieldRow from "@/components/FieldRow";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface SponsorItem {
	id: string;
	name: string;
	pdf?: string;
	password?: string;
}

interface SponsorBlock {
	id: string;
	label: string;
	items: SponsorItem[];
}

interface SponsorsData {
	id: string;
	sectionTitle: string;
	blocks: SponsorBlock[];
}

interface Props {
	data: SponsorsData;
	onChange: (value: SponsorsData) => void;
}

export default function SponsorsSection({ data, onChange }: Props) {
	function update<K extends keyof SponsorsData>(
		key: K,
		value: SponsorsData[K],
	) {
		onChange({ ...data, [key]: value });
	}

	function updateBlock(index: number, partial: Partial<SponsorBlock>) {
		const clone = [...data.blocks];
		clone[index] = { ...clone[index], ...partial };
		update("blocks", clone);
	}

	function addBlock() {
		update("blocks", [...data.blocks, { id: "", label: "", items: [] }]);
	}

	function removeBlock(index: number) {
		update(
			"blocks",
			data.blocks.filter((_, i) => i !== index),
		);
	}

	function updateItem(
		blockIndex: number,
		itemIndex: number,
		partial: Partial<SponsorItem>,
	) {
		const blocksClone = [...data.blocks];
		const itemsClone = [...blocksClone[blockIndex].items];
		itemsClone[itemIndex] = { ...itemsClone[itemIndex], ...partial };
		blocksClone[blockIndex] = { ...blocksClone[blockIndex], items: itemsClone };
		update("blocks", blocksClone);
	}

	function addItem(blockIndex: number) {
		const blocksClone = [...data.blocks];
		const items = blocksClone[blockIndex].items ?? [];
		items.push({ id: "", name: "" });
		blocksClone[blockIndex] = { ...blocksClone[blockIndex], items };
		update("blocks", blocksClone);
	}

	function removeItem(blockIndex: number, itemIndex: number) {
		const blocksClone = [...data.blocks];
		const items = blocksClone[blockIndex].items.filter(
			(_, i) => i !== itemIndex,
		);
		blocksClone[blockIndex] = { ...blocksClone[blockIndex], items };
		update("blocks", blocksClone);
	}

	return (
		<Card>
			<CardHeader className="flex justify-between items-center">
				<CardTitle>Patrocinadores</CardTitle>
				<Button size="sm" variant="outline" onClick={addBlock}>
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
					{data.blocks.map((block, bIdx) => (
						<div
							key={bIdx}
							className="border break-inside-avoid rounded p-6 space-y-3 bg-sidebar "
						>
							<Badge
								variant="secondary"
								className="bg-slate-800 text-slate-200"
							>
								BLOCO DE MARCAS
							</Badge>
							<FieldRow label="ID do bloco (slug)">
								<Input
									value={block.id}
									onChange={(e) => updateBlock(bIdx, { id: e.target.value })}
								/>
							</FieldRow>

							<FieldRow label="Chancela (ex: Patrocínio, Apoio)">
								<Input
									value={block.label}
									onChange={(e) => updateBlock(bIdx, { label: e.target.value })}
								/>
							</FieldRow>

							<div className="flex justify-between items-center">
								<span className="text-sm text-neutral-500">Marcas</span>
								<Button variant="outline" onClick={() => addItem(bIdx)}>
									Adicionar marca
								</Button>
							</div>

							<div className="space-y-2 ">
								{block.items.map((item, iIdx) => (
									<div
										key={iIdx}
										className="border flex justify-between rounded p-3 bg-white gap-1 "
									>
										<div className="space-y-4 w-full">
											<Input
												placeholder="ID da marca (slug)"
												value={item.id}
												onChange={(e) =>
													updateItem(bIdx, iIdx, { id: e.target.value })
												}
											/>

											<Input
												placeholder="Arquivo da logo (ex: fecomercio.webp)"
												value={item.name}
												onChange={(e) =>
													updateItem(bIdx, iIdx, { name: e.target.value })
												}
											/>

											<Input
												placeholder="PDF (ex: fecomercio.pdf)"
												value={item.pdf ?? ""}
												onChange={(e) =>
													updateItem(bIdx, iIdx, { pdf: e.target.value })
												}
											/>

											<Input
												placeholder="Senha"
												value={item.password ?? ""}
												onChange={(e) =>
													updateItem(bIdx, iIdx, { password: e.target.value })
												}
											/>
										</div>

										<Button
											variant="ghost"
											size="sm"
											onClick={() => removeItem(bIdx, iIdx)}
										>
											<X className="h-4 w-4" />
										</Button>
									</div>
								))}

								{block.items.length === 0 && (
									<p className="text-xs text-neutral-500">
										Nenhuma marca neste bloco.
									</p>
								)}
							</div>

							<Button
								variant="secondary"
								size="sm"
								onClick={() => removeBlock(bIdx)}
							>
								<X className="h-4 w-4" /> Remover bloco
							</Button>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
