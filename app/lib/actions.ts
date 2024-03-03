'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from './prisma'


export type State = {
  errors?: {
    name?: string[];
    description?: string[];
    buyed_value?: string[];
    sold_value?: string[];
    quantity?: string[];

  };
  message?: string | null;
};


const message = "Insira um valor acima de 0.";

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  buyed_value: z.coerce.number().gt(0, { message: message }),
  sold_value: z.coerce.number().gt(0, { message: message }),
  quantity: z.coerce.number().gt(0, { message: message }),
  // customerId: z.string({
  //   invalid_type_error: 'Please select a customer.',
  // }),  
  // status: z.enum(['pending', 'paid'], {
  //   invalid_type_error: 'Please select an invoice status.',
  // }),
  date: z.string(),
});

const CreateProduct = FormSchema.omit({ id: true, date: true });

export async function createProduct(prevState: State, formData: FormData) {
  const validatedFields = CreateProduct.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    buyed_value: formData.get('buyed_value'),
    sold_value: formData.get('sold_value'),
    quantity: formData.get('quantity'),

  });

  if (!validatedFields.success) {
    console.log("Algo deu errado", validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltando. Erro ao criar produto.',
    };
  }
 
  const { buyed_value,description, name, quantity, sold_value } = validatedFields.data;
 
  try {
    await prisma.products.create({ // Melhorar inserção
      data: {
        name: name, 
        buyed_value: buyed_value,
        quantity: quantity,
        sold_value: sold_value,
        description: description
  
      },
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  revalidatePath('/admin/products');
  // redirect('/admin/products');
}