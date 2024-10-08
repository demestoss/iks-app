import { signUpAction, signUpWithGithubAction } from "./sign-up.action";
import { FormMessage, type Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import GithubLogo from "../assets/github-white.svg";

export default function Signup({ searchParams }: { searchParams: Message }) {
	if ("message" in searchParams) {
		return (
			<div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
				<FormMessage message={searchParams} />
			</div>
		);
	}

	return (
		<div className="flex flex-col min-w-64 gap-2 mx-auto">
			<form className="flex flex-col">
				<h1 className="text-2xl font-medium">Sign up</h1>
				<p className="text-sm text text-foreground">
					Already have an account?{" "}
					<Link className="text-primary font-medium underline" href="/sign-in">
						Sign in
					</Link>
				</p>
				<div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
					<Label htmlFor="email">Email</Label>
					<Input name="email" placeholder="you@example.com" required />
					<Label htmlFor="password">Password</Label>
					<Input
						type="password"
						name="password"
						placeholder="Your password"
						minLength={6}
						required
					/>
					<SubmitButton formAction={signUpAction} pendingText="Signing up...">
						Sign up
					</SubmitButton>
					<FormMessage message={searchParams} />
				</div>
			</form>
			<Separator />
			<form className="flex-1 mt-2">
				<SubmitButton
					className="gap-2 w-full"
					formAction={signUpWithGithubAction}
				>
					Sign up with Github
					<Image src={GithubLogo} width={20} height={20} alt="Github Logo" />
				</SubmitButton>
			</form>
			<SmtpMessage />
		</div>
	);
}
