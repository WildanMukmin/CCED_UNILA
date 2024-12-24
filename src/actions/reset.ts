'use server'

import { getUserByEmail } from '@/data/user'
import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/tokens'
import { forgotPasswordSchema } from '@/lib/zod'
import * as z from 'zod'

export const reset = async (data: z.infer<typeof forgotPasswordSchema>) => {
  const validateField = forgotPasswordSchema.safeParse(data)

  if (!validateField.success) {
    return { error: 'Invalid Email!' }
  }

  const { email } = validateField.data

  const user = await getUserByEmail(email)

  if (!user) {
    return { error: 'Email not found!' }
  }

  const existingToken = await generatePasswordResetToken(email)
  await sendPasswordResetEmail(existingToken.email, existingToken.token)

  return { success: 'Email sent!' }
}