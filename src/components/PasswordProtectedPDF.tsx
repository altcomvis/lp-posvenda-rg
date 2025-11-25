import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
	id: string;
	logo: string;
	pdf: string;
	password: string;
}

export default function PasswordProtectedPDF({
	id,
	logo,
	pdf,
	password,
}: Props) {
	const [open, setOpen] = useState(false);
	const [pass, setPass] = useState("");
	const [error, setError] = useState("");

	function handleSubmit() {
		if (pass === password) {
			setError("");
			window.open(pdf, "_blank");
			setOpen(false);
			setPass("");
		} else {
			setError("Senha incorreta");
		}
	}

	return (
		<>
			<button
				type="button"
				className="inline-flex flex-col items-center gap-2 focus:outline-none"
				onClick={() => setOpen(true)}
			>
				<img
					src={logo}
					alt={id}
					className="object-contain object-center md:h-auto h-14"
				/>
			</button>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="flex items-center justify-center py-4">
							<img
								src={logo}
								alt={id}
								className="h-16 w-auto object-contain "
							/>
						</DialogTitle>
					</DialogHeader>

					<div className="space-y-3">
						<Input
							type="password"
							placeholder="Digite a senha"
							value={pass}
							onChange={(e) => setPass(e.target.value)}
						/>

						{error && <p className="text-xs text-red-500">{error}</p>}

						<Button className="w-full" onClick={handleSubmit}>
							Abrir PDF
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
