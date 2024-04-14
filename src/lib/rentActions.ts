'use server';
import { z } from 'zod';
import prisma from './prisma'
import { stringCurrencyToNumber } from './utils';

const FormSchema = z.object({
  id: z.string(),
  bike: z.any(),
  user: z.any(),
  value: z.string()
    .transform((v) => stringCurrencyToNumber(v))
    .refine((n) => n > 0, {
      message: 'Valor deve ser acima de R$ 0',
    }),
  // scheduleStart: z.date(),
  // scheduleEnd: z.date(),
  date: z.string(),
});

const CreateRent = FormSchema.omit({ id: true, date: true });
const UpdateRent = FormSchema.omit({ id: true, date: true });

export async function createRent(data: any) { // Tipar
  console.log("Toda data", data)
  const validatedFields = CreateRent.safeParse(data);
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltando. Erro ao criar produto.',
    };
  }
 
  // const { scheduleEnd, scheduleStart, value, bike, user } = validatedFields.data;
   const { value, bike, user } = validatedFields.data;
   const data2 = data.date

  try {
    await prisma.rents.create({
      data: {
        bikeName: bike.name,
        bikeId: bike.id,
        userName: user.name,
        userId: user.id, 
        value: value,
        scheduleStart: data2[0],
        scheduleEnd: data2[1],
      },
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
}

export async function updateRent(data: any) { // Tipar
  const validatedFields = UpdateRent.safeParse(data);

  if (!validatedFields.success) {
    console.log("Algo deu errado", validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltando. Erro ao criar produto.',
    };
  }
 
  const { scheduleEnd, scheduleStart, value, bike, user } = validatedFields.data;
  
  try {
    await prisma.rents.update({
      data: {
        value: value,
        scheduleStart: scheduleStart,
        scheduleEnd: scheduleEnd,
      },
      where: {
        id: data.id
      }
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
}

export async function deleteProduct(id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await prisma.products.delete({
      where: {
        id: id
      }
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // redirect('/admin/products'); // Devido ao client side na table, eu recarrego a página pro useEffect rolar

}