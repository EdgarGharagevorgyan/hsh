"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../admin.module.scss";

export default function AdminLoginPage() {
    const { data: session, status } = useSession();
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    useEffect(() => {
        if (session?.user) {
            // Already logged in → go to dashboard
            window.location.href = "/admin";
        }
    }, [session]);

    if (status === "loading") {
        return <div className={styles.container}><p>Ստուգվում է...</p></div>;
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError("");

        const res = await signIn("credentials", {
            password,
            redirect: false,
        });

        if (res?.error) {
            setLoginError("Սխալ գաղտնաբառ");
        } else {
            setPassword("");
            window.location.href = "/admin";
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginCard}>
                <div className={styles.logo}>
                    <Image src="/hsh-logo.svg" alt="HSH Logo" width={200} height={80} priority />
                </div>

                <h1 className={styles.loginTitle}>Ադմին մուտք</h1>
                <p className={styles.loginSubtitle}>Մուտք գործեք Ձեր գաղտնաբառով</p>

                <form onSubmit={handleLogin} className={styles.loginForm}>
                    <div className={styles.inputWrapper}>
                        <input
                            type="password"
                            placeholder="Գաղտնաբառ"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoFocus
                            className={styles.passwordInput}
                        />
                    </div>

                    <button type="submit" className={styles.loginButton}>Մուտք գործել</button>
                    {loginError && <p className={styles.loginError}>{loginError}</p>}
                </form>
            </div>
        </div>
    );
}
