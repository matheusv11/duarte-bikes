'use server';
import { z } from 'zod';
import prisma from './prisma'

import { format } from 'date-fns';
import { stringCurrencyToNumber } from './utils';

const SelledProductFormSchema = z.object({
  id: z.string(),
  product: z.any(),
  soldValue: z.string()
    .transform((v) => stringCurrencyToNumber(v))
    .refine((n) => n > 0, {
      message: 'Valor deve ser acima de R$ 0',
    })
    .optional()
    .or(z.literal('')),
  quantity: z.coerce.number().min(1),
  date: z.date(),
});


const CreateSelledProduct = SelledProductFormSchema.omit({ id: true, date: true });
const UpdateSelledProduct = SelledProductFormSchema.omit({ id: true, date: true });

export async function createSelledProduct(data: any) { // Tipar

  const validatedFields = CreateSelledProduct.safeParse(data);

  if (!validatedFields.success) {
    console.log("Algo deu errado", validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltando. Erro ao criar produto.',
    };
  }

  const { date, product, quantity, soldValue } = validatedFields.data as any; 

  const valueToSold = soldValue ? soldValue : (quantity * product.soldValue)
  try {
    await prisma.selledProducts.create({
      data: {
        productName: product.name,
        productSoldValue: product.soldValue,
        productBuyedValue: product.buyedValue,
        liquidValue: valueToSold - (product.buyedValue * quantity),
        soldValue: valueToSold,
        selledAt: data.date,
        productId: product.id,
        quantity: quantity,
      },
    });

    await prisma.products.update({
      where: {
        id: product.id,
      },
      data: {
        quantity: {
          decrement: quantity
        }
      }
    })
    
  } catch (error) {
    console.log("Error", error)
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  // revalidatePath('/admin/products');
  // redirect('/admin/products'); // Devido ao client side na table, eu recarrego a página pro useEffect rolar
}

export async function updateSelledProduct(data: any) { // Tipar

  console.log("Data", data)
  const validatedFields = UpdateSelledProduct.safeParse(data);

  if (!validatedFields.success) {
    console.log("Algo deu errado", validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltando. Erro ao criar produto.',
    };
  }

  const { date, product, quantity, soldValue } = validatedFields.data as any;

  try {
    await prisma.selledProducts.update({
      where: {
        id: data.id,
      },
      data: {
        // productName: product.name,
        // productValue: product.soldValue,
        // productId: product.id,
        // soldValue: soldValue ? soldValue : (quantity * product.soldValue),
        liquidValue: soldValue - (product.buyedValue * quantity),
        soldValue: soldValue,
        selledAt: data.date,
        quantity: quantity,
      },
    });

    await prisma.products.update({
      where: {
        id: product.id,
      },
      data: {
        quantity: {
          decrement: quantity
        }
      }
    })
    
  } catch (error) {
    console.log("Error", error)
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  // revalidatePath('/admin/products');
  // redirect('/admin/products'); // Devido ao client side na table, eu recarrego a página pro useEffect rolar
}

export async function deleteProduct(id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await prisma.selledProducts.delete({
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