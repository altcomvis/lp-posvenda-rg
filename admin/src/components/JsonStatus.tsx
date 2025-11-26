// src/components/JsonStatus.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ValidationResult } from "@/lib/validation";

interface Props {
	validation: ValidationResult;
}

export default function JsonStatus({ validation }: Props) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Estado do JSON</CardTitle>
			</CardHeader>
			<CardContent>
				{validation.valid ? (
					<p className="text-sm text-emerald-400">
						Estrutura válida. Pode salvar com segurança.
					</p>
				) : (
					<div className="text-sm text-red-400">
						<p>Foram encontrados erros na estrutura:</p>
						<ul className="mt-2 list-disc ml-4 text-xs">
							{validation.errors.map((err, idx) => (
								<li key={idx}>{err}</li>
							))}
						</ul>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
