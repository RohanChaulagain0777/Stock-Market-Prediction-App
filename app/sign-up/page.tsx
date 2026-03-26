import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <SignUp />
    </div>
  )
}