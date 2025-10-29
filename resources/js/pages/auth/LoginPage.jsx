import fullLogo from '@/assets/dark-full-logo.svg'

import { Form } from '@inertiajs/react'

import { 
    Card, 
    CardContent, 
    CardFooter, 
    CardHeader, 
} from "@/components/ui/card"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

import { Spinner } from "@/components/ui/spinner"

export default function LoginPage() {  
    return (
        <>
            <main className="flex items-center justify-center bg-[#062745] min-h-screen">
                <Form action="/login" method="POST">
                    {({ errors, processing }) => (
                        <Card className="w-96">
                            <CardHeader className="flex justify-center">
                                <img src={fullLogo} className="w-36" />
                            </CardHeader>
                            <CardContent>
                                
                                <div className="flex flex-col gap-6">
                                    {/* Email */}
                                    <div className="flex flex-col gap-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" name="email" placeholder="m@example.com" required />
                                        {errors.email && (<span className="text-sm text-red-500">{errors.email}</span>)}
                                    </div>  

                                    {/* Password */}
                                    <div className="flex flex-col gap-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input id="password" type="password" name="password" required />
                                        {errors.password && (<span className="text-sm text-red-500">{errors.password}</span>)}
                                    </div>              
                                </div>
                                
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" disabled={processing} className="w-full bg-[#052743] hover:bg-[#365065] active:bg-[#647888]">
                                    {processing ? (<><Spinner /> Logging in...</>) : 'Log in'}
                                </Button>
                            </CardFooter>
                        </Card>
                    )}
                </Form>
            </main>
        </>
    )
}