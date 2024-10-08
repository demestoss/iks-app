'use server';
import { encodedRedirect } from "@/app/utils";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const signInAction = async (formData: FormData) => {
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();
	const supabase = createClient();

    if (!email || !password) {
		return { error: "Email and password are required" };
	}

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return encodedRedirect("error", "/sign-in", error.message);
	}

	return redirect("/protected");
};

export const signInWithGithubAction = async () => {
	const supabase = createClient();

	const { error } = await supabase.auth.signInWithOAuth({
		provider: 'github'
	});

	if (error) {
		return encodedRedirect("error", "/sign-in", error.message);
	}

	return redirect("/protected");
};