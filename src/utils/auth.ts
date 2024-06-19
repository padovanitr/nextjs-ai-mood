import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from './db'

export const getUserByClerkId = async () => {
  const user = await currentUser()

  const foundUser = await prisma.user.findUnique({
    where: {
      email: user?.emailAddresses[0].emailAddress as string,
    },
  })

  return foundUser
}
