"use client"

import React, {useState, useTransition} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {loginSchema, LoginSchemaType} from "@/validation/auth.schema";
import {login} from "@/app/(auth)/login/actions";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import LoadingButton from "@/components/loadingButton";

const LoginForm: React.FC = () => {
    const [error, setError] = useState<string>()

    const [isPending, startTransition] = useTransition()

    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: "",
            password: ""
        }
    })

    const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
        setError(undefined)
        startTransition(async () => {
            const {error} = await login(data)
            if(error) {
                setError(error)
            }
        })
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-3"}>
                {error && <p className={"text-center text-destructive"}>{error}</p>}
                <FormField
                    name={"identifier"}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Username or Email</FormLabel>
                            <FormControl>
                                <Input placeholder={"johndoe"} type={"text"} {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    name={"password"}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder={"********"} type={"password"} {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <LoadingButton loading={isPending} className={"w-full"}>Log in</LoadingButton>
            </form>
        </Form>
    );
};

export default LoginForm;