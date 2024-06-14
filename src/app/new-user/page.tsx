import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  const user = await currentUser()

  const match = await prisma.user.findUnique({
    where: {
      email: user?.emailAddresses[0].emailAddress as string,
    },
  })
  console.log('match', match)

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user?.id as string,
        email: user?.emailAddresses[0].emailAddress as string,
      },
    })

    redirect('/sign-in')
  } else {
    console.log('entrou aqui')
    redirect('/journal')
  }
}

const NewUser = async () => {
  await createNewUser()
  return <div>...loading</div>
}

export default NewUser
