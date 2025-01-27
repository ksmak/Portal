'use client'

import React from "react";
import { useForm } from "react-hook-form";
import { AuthActions } from "@/app/components/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

type FormData = {
    email: string;
    password: string;
};

const Login = () => {
    const searchParams = useSearchParams();

    const pathname = searchParams.get('pathname') || '/'

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormData>();

    const router = useRouter();

    const { login, storeToken } = AuthActions();

    const onSubmit = (data: FormData) => {
        login(data.email, data.password)
            .json((json) => {
                storeToken(json.access, "access");
                storeToken(json.refresh, "refresh");
                router.push(pathname);
            })
            .catch((err) => {
                setError("root", { type: "manual", message: "Ошибка! Неверный логин или пароль." });
            });
    };

    return (
        <div className="flex justify-center rounded-md">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg shadow-blue-200 w-1/3">
                <h3 className="text-2xl font-semibold">Войти в систему</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                    <div>
                        <label className="block" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            type="text"
                            placeholder="Email"
                            {...register("email", { required: "Email не должен быть пустым" })}
                        />
                        <div className="mt-1 text-sm text-red-600">{errors.email?.message}</div>
                    </div>
                    <div className="mt-4">
                        <label className="block" htmlFor="password">
                            Пароль
                        </label>
                        <input
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            type="password"
                            placeholder="Пароль"
                            {...register("password", { required: "Пароль не должен быть пустым" })}
                        />
                        <div className="mt-1 text-sm text-red-600">{errors.password?.message}</div>
                    </div>
                    <div className="w-full text-center mt-4">
                        <button
                            className="px-12 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 hover:cursor-pointer"
                            type="submit">
                            Войти
                        </button>
                        <div className="mt-3 text-sm text-red-600">{errors.root?.message}</div>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <Link
                        href="/auth/password/reset-password"
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Забыли пароль?
                    </Link>
                </div>
            </div >
        </div >
    );
};

export default Login;