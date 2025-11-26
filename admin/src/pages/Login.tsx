// src/pages/Login.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginProps {
	onAuthenticated: () => void;
}

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "rg2024";

export default function Login({ onAuthenticated }: LoginProps) {
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (password === ADMIN_PASSWORD) {
			setError(null);
			onAuthenticated();
		} else {
			setError("Senha inválida.");
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<Card className="w-full max-w-sm ">
				<CardHeader>
					<CardTitle>Acesso ao Admin</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-1">
							<Label className="text-xs uppercase tracking-wide text-neutral-500">
								Senha
							</Label>
							<Input
								type="password"
								placeholder="Digite a senha do admin"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						{error && (
							<p className="text-xs text-red-400 border border-red-700 rounded p-2">
								{error}
							</p>
						)}

						<Button type="submit" className="w-full bg-red-600">
							Entrar
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
