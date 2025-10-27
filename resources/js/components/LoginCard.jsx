import { 
    Card, 
    CardContent, 
    CardFooter, 
    CardHeader, 
} from "@/components/ui/card"

import fullLogo from "@/assets/full-logo.svg"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function LoginCard() {
    return (
        <>
            <Card className="w-96">
                <CardHeader className="flex justify-center">
                    <img src={fullLogo} className="w-36" />
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            {/* Email */}
                            <div className="flex flex-col gap-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="m@example.com" required />
                            </div>  

                            {/* Password */}
                            <div className="flex flex-col gap-y-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" required />
                            </div>              
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full bg-[#052743] hover:bg-[#365065]">
                        Login
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}