import FieldRow from "@/components/FieldRow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface HeroData {
	id: string;
	videoUrl: string;
	title: string;
	backgroundClass?: string;
}

interface Props {
	data: HeroData;
	onChange: (value: HeroData) => void;
}

export default function HeroSection({ data, onChange }: Props) {
	function update<K extends keyof HeroData>(key: K, value: HeroData[K]) {
		onChange({ ...data, [key]: value });
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Hero</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4 columns-1 md:columns-2 gap-8	">
				<FieldRow label="ID (âncora)">
					<Input
						value={data.id}
						onChange={(e) => update("id", e.target.value)}
					/>
				</FieldRow>

				<FieldRow label="Título">
					<Input
						value={data.title}
						onChange={(e) => update("title", e.target.value)}
					/>
				</FieldRow>

				<FieldRow label="URL do vídeo (Vimeo)">
					<Input
						value={data.videoUrl}
						onChange={(e) => update("videoUrl", e.target.value)}
					/>
				</FieldRow>

				<FieldRow label="Classe de fundo (opcional)">
					<Input
						value={data.backgroundClass ?? ""}
						onChange={(e) => update("backgroundClass", e.target.value)}
						placeholder="ex: bg-black"
					/>
				</FieldRow>
			</CardContent>
		</Card>
	);
}
