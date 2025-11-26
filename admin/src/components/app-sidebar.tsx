import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface Props {
	active: string;
	setActive: (key: string) => void;
	sections: Record<string, string>;
	onSave: () => void;
	saving: boolean;
	validation: { valid: boolean; errors: string[] };
}

export function AppSidebar({
	setActive,
	sections,
	onSave,
	saving,
	validation,
}: Props) {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Editor</SidebarGroupLabel>
					<SidebarGroupContent>
						<div className="flex flex-col gap-1 px-2">
							{Object.entries(sections).map(([key, label]) => (
								<Button
									variant="ghost"
									className="self-start"
									key={key}
									onClick={() => setActive(key)}
								>
									{label}
								</Button>
							))}
						</div>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className="p-4 border-t border-neutral-300">
				<div className="space-y-6">
					{/* Estado da validação */}
					{validation.valid ? (
						<Badge
							className="text-xs text-white bg-emerald-400"
							variant="secondary"
						>
							✔ JSON válido
						</Badge>
					) : (
						<Badge className="text-xs text-red-400">
							✖ JSON inválido ({validation.errors.length})
						</Badge>
					)}

					<Button
						variant="destructive"
						onClick={onSave}
						disabled={saving || !validation.valid}
					>
						{saving ? "Salvando..." : "Publicar alterações"}
					</Button>
				</div>
				<p className="text-[10px] text-neutral-500 ">
					Admin • Pós Venda Rio Gastronomia
				</p>
			</SidebarFooter>
		</Sidebar>
	);
}
