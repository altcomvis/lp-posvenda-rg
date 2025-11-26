// src/components/FieldRow.tsx
import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

interface FieldRowProps {
	label: string;
	description?: string;
	children: ReactNode;
}

export default function FieldRow({
	label,
	description,
	children,
}: FieldRowProps) {
	return (
		<div className="space-y-1">
			<Label className="text-xs  tracking-wide text-neutral-500">{label}</Label>
			{description && <p className="text-xs text-neutral-500">{description}</p>}
			{children}
		</div>
	);
}
