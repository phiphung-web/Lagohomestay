"use client";

import { Loader2, LockKeyhole } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter(); const [loading,setLoading]=useState(false); const [error,setError]=useState("");
  const submit = async (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); setLoading(true); setError(""); const form=new FormData(event.currentTarget); const result=await signIn("credentials",{email:form.get("email"),password:form.get("password"),redirect:false}); if(result?.error){setError("Email hoặc mật khẩu chưa đúng.");setLoading(false);return;} router.push("/admin/tong-quan"); router.refresh(); };
  return <form onSubmit={submit} className="mt-8 space-y-5"><label className="block text-sm font-bold">Email<input className="input mt-2" defaultValue="owner@lago.local" type="email" name="email" required/></label><label className="block text-sm font-bold">Mật khẩu<input className="input mt-2" defaultValue="Lago@2026" type="password" name="password" required/></label>{error&&<p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}<button disabled={loading} className="btn-primary w-full">{loading?<Loader2 className="animate-spin"/>:<LockKeyhole className="h-4 w-4"/>}Đăng nhập quản trị</button><p className="text-center text-xs text-lago-ink/45">Tài khoản mẫu đã được điền sẵn</p></form>;
}
