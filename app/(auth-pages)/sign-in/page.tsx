import { signInAction, signInWithGithubAction } from "./sign-in.action";
import { FormMessage, type Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import GithubLogo from "../assets/github-white.svg";
import { Separator } from "@/components/ui/separator";

export default function Login({ searchParams }: { searchParams: Message }) {
	return (
		<div className="flex flex-col min-w-64 gap-2">
			<form className="flex-1 flex flex-col">
				<h1 className="text-2xl font-medium">Sign in</h1>
				<p className="text-sm text-foreground">
					Don't have an account?{" "}
					<Link
						className="text-foreground font-medium underline"
						href="/sign-up"
					>
						Sign up
					</Link>
				</p>
				<div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
					<Label htmlFor="email">Email</Label>
					<Input name="email" placeholder="you@example.com" required />
					<div className="flex justify-between items-center">
						<Label htmlFor="password">Password</Label>
						<Link
							className="text-xs text-foreground underline"
							href="/forgot-password"
						>
							Forgot Password?
						</Link>
					</div>
					<Input
						type="password"
						name="password"
						placeholder="Your password"
						required
					/>
					<SubmitButton pendingText="Signing In..." formAction={signInAction}>
						Sign in
					</SubmitButton>
					<FormMessage message={searchParams} />
				</div>
			</form>
			<Separator />
			<form className="flex-1 mt-2">
				<SubmitButton className="gap-2 w-full" formAction={signInWithGithubAction}>
					Sign in with Github
					<Image src={GithubLogo} width={20} height={20} alt="Github Logo" />
				</SubmitButton>
			</form>
		</div>
	);
}
