import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="w-screen h-screenflex justify-center items-center">
      <SignIn path="/sign-in" />
    </div>
  )
}
