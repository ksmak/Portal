'use client'

import React from "react";
import { useForm } from "react-hook-form";
import { AuthActions } from "@/app/components/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";

type FormData = {
    email: string;
    password: string;
};

const Login = () => {
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

                router.push("/");
            })
            .catch((err) => {
                setError("root", { type: "manual", message: err.json.detail });
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-1/3">
                <h3 className="text-2xl font-semibold">Войти в систему</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                    <div>
                        <label className="block" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="text"
                            placeholder="Email"
                            {...register("email", { required: true })}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                        {errors.email && (
                            <span className="text-xs text-red-600">Email не должен быть пустым</span>
                        )}
                    </div>
                    <div className="mt-4">
                        <label className="block" htmlFor="password">
                            Пароль
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            {...register("password", { required: true })}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                        {errors.password && (
                            <span className="text-xs text-red-600">Пароль не должен быть пустым</span>
                        )}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <button className="px-12 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
                            Войти
                        </button>
                    </div>
                    {errors.root && (
                        <span className="text-xs text-red-600">{errors.root.message}</span>
                    )}
                </form>
                <div className="mt-6 text-center">
                    <Link
                        href="/auth/password/reset-password"
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Забыли пароль?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;