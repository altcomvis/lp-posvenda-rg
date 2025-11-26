import FieldRow from "@/components/FieldRow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface MenuItem {
	label: string;
	href: string;
}

interface Props {
	data: MenuItem[];
	onChange: (value: MenuItem[]) => void;
}

export default function MenuSection({ data, onChange }: Props) {
	function updateItem(index: number, partial: Partial<MenuItem>) {
		const clone = [...data];
		clone[index] = { ...clone[index], ...partial };
		onChange(clone);
	}

	// function addItem() {
	// 	onChange([...data, { label: "Novo item", href: "#novo" }]);
	// }

	// function removeItem(index: number) {
	// 	const clone = data.filter((_, i) => i !== index);
	// 	onChange(clone);
	// }

	return (
		<Card>
			<CardHeader className="flex justify-between items-center">
				<CardTitle>Menu</CardTitle>
				{/* <Button size="sm" variant="outline" onClick={addItem}>
				Adicionar item
			</Button> */}
			</CardHeader>
			<CardContent className="space-y-4 columns-1 md:columns-3 gap-8">
				{data.map((item, idx) => (
					<div
						key={idx}
						className="border rounded p-3 space-y-2 break-inside-avoid"
					>
						{/* <Button variant="ghost" size="sm" onClick={() => removeItem(idx)}>
							<X className="h-4 w-4" />
						</Button> */}
						<FieldRow label="Rótulo">
							<Input
								value={item.label}
								onChange={(e) => updateItem(idx, { label: e.target.value })}
							/>
						</FieldRow>

						<FieldRow label="Âncora (href)">
							<Input
								value={item.href}
								onChange={(e) => updateItem(idx, { href: e.target.value })}
							/>
						</FieldRow>
					</div>
				))}

				{data.length === 0 && (
					<p className="text-xs text-neutral-500">Nenhum item cadastrado.</p>
				)}
			</CardContent>
		</Card>
	);
}
