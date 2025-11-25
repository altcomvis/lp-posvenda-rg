import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface LoginProps {
	onAuthenticated: () => void;
	onLoadContent: () => Promise<void>;
}

export default function Login({ onAuthenticated, onLoadContent }: LoginProps) {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "1234";

	async function handleLogin() {
		setError("");

		if (password !== ADMIN_PASSWORD) {
			setError("Senha incorreta.");
			return;
		}

		// Marca autenticado
		localStorage.setItem("admin-auth", "true");
		onAuthenticated();

		// Carrega conteúdo automático
		await onLoadContent();

		// Vai para o painel
		navigate("/admin");
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-50">
			<Card className="bg-neutral-900 border-neutral-800 w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-center">Acesso Administrativo</CardTitle>
				</CardHeader>

				<CardContent className="space-y-4">
					<Input
						type="password"
						placeholder="Senha do Admin"
						className="bg-neutral-800"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					{error && <p className="text-red-400 text-xs">{error}</p>}

					<Button onClick={handleLogin} className="w-full bg-red-600">
						Entrar
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
