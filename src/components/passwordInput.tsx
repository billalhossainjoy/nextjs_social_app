import React from "react"

import { cn } from "@/lib/utils"
import {Input, type InputProps } from "@/components/ui/input";
import {Eye, EyeOff} from "lucide-react";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({className, ...props}, ref) => {
        const [showPassword, setShowPassword] = React.useState(false)

        return (
            <div className={"relative"}>
                <Input
                    type={showPassword ? "text": "password"}
                    className={cn("pe-10", className)}
                    ref={ref}
                    {...props}
                />
                <button type={"button"} onClick={() => setShowPassword(!showPassword)}
                        title={showPassword ? "Hide password": "Show Password"}
                        className={"absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"}
                >
                    {
                        showPassword ? <EyeOff className={"size-5"}/> : <Eye className={"size-5"}/>
                    }
                </button>
            </div>
        )
    }
)

PasswordInput.displayName = "PasswordInput";


export default PasswordInput