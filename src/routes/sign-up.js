import { SignUp } from "@clerk/clerk-react"

export default function SignUpPage() {
    return (
        <div className="flex flex-row min-h-screen justify-center items-center">
            <SignUp path="/sign-up" />
        </div>
    );
}