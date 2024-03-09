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
  name: z.string().min(1),
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
const UpdateProduct = FormSchema.omit({ date: true, id: true });

export async function createProduct(data: any) { // Tipar
  const validatedFields = CreateProduct.safeParse(data);

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
 
  // revalidatePath('/admin/products');
  // redirect('/admin/products'); // Devido ao client side na table, eu recarrego a página pro useEffect rolar
}

export async function updateProduct(data: any) { // Tipar
  const validatedFields = UpdateProduct.safeParse(data);

  if (!validatedFields.success) {
    console.log("Algo deu errado", validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltando. Erro ao criar produto.',
    };
  }
 
  const {buyed_value,description, name, quantity, sold_value } = validatedFields.data;
  
  try {
    await prisma.products.update({
      data: {
        name: name, 
        buyed_value: buyed_value,
        quantity: quantity,
        sold_value: sold_value,
        description: description
  
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
 
  // revalidatePath('/admin/products'); // Passar pro redux
  // redirect('/admin/products'); // Devido ao client side na table, eu recarrego a página pro useEffect rolar
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