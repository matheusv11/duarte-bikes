'use server';
import { z } from 'zod';
import prisma from './prisma'
import {removeSpecialCharacters,} from './utils';
import bcrypt from 'bcrypt';

const FormSchema = z.object({
  id: z.string(),
  name: z.string({
    required_error: 'Campo deve conter no mínimo 1 caractere'
  }).min(1),
  address: z.string(),
  cpfCnpj: z.string().transform(v => removeSpecialCharacters(v)),
  cellphone: z.string().transform(v => removeSpecialCharacters(v)),
  date: z.string(),
});

const CreateCustomer = FormSchema.omit({ id: true, date: true });
const UpdateProduct = FormSchema.omit({ id: true, date: true });

export async function createCustomer(data: any) { // Tipar
  const validatedFields = CreateCustomer.safeParse(data);
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltando. Erro ao criar produto.',
    };
  }
 
  const { name,address,cellphone,cpfCnpj } = validatedFields.data;
  const hashedPassword = await bcrypt.hash("mk1@b7k7", 10); // Deixar no env
  try {
    await prisma.users.create({
      data: {
        name: name,
        address: address,
        cellphone: cellphone,
        cpfCnpj: cpfCnpj,
        kind: 'user',
        password: hashedPassword
      },
    })
  } catch (error) {
    console.log("Error", error)
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
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
 
  const {buyedValue, description, name, quantity, soldValue } = validatedFields.data;
  
  try {
    await prisma.products.update({
      data: {
        name: name, 
        buyedValue: buyedValue,
        quantity: quantity,
        soldValue: soldValue,
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