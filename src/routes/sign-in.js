import { SignIn } from "@clerk/clerk-react"

export default function SignInPage() {
    return(
    <div className="flex flex-row min-h-screen justify-center items-center">
        <SignIn path="/sign-in" />;
    </div>
    )
}