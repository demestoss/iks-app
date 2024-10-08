'use server'
import { encodedRedirect } from "@/app/utils";
import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";

export const signUpAction = async (formData: FormData) => {
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();
	const supabase = createClient();
	const origin = headers().get("origin");

	if (!email || !password) {
		return { error: "Email and password are required" };
	}

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${origin}/auth/callback`,
		},
	});

	if (error) {
		console.error(`${error.code} ${error.message}`);
		return encodedRedirect("error", "/sign-up", error.message);
	}
	return encodedRedirect(
		"success",
		"/sign-up",
		"Thanks for signing up! Please check your email for a verification link.",
	);
};

export const signUpWithGithubAction = async () => {
	const supabase = createClient();

	const { error } = await supabase.auth.signInWithOAuth({
		provider: 'github'
	});

	if (error) {
		console.error(`${error.code} ${error.message}`);
		return encodedRedirect("error", "/sign-up", error.message);
	}
	return encodedRedirect(
		"success",
		"/sign-up",
		"Thanks for signing up! Please check your email for a verification link.",
	);
};