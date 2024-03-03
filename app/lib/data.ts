import { unstable_noStore as noStore } from 'next/cache';
import prisma from './prisma';
import { format } from 'date-fns';

export async function fetchProducts() {
  noStore();

  try {
    const products = await prisma.products.findMany();
    const formatedProducts = products.map(p => ({...p, createdAt: format(p.createdAt, "dd/MM/yyyy HH:mm:ss"), updatedAt: format(p.updatedAt, "dd/MM/yyyy HH:mm:ss")})) // Formato br
    return formatedProducts; // Tipar bem o retorno
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}
