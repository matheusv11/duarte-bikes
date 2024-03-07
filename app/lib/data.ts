import { unstable_noStore as noStore } from 'next/cache';
import prisma from './prisma';
import { format } from 'date-fns';

interface FetchProducts {
  page?: number;
  perPage?: number;
  query?: string;
}

export async function fetchProducts({query, page = 1, perPage = 5 }: FetchProducts) {
  noStore();

  const skip = (page - 1) * perPage;
  const take = perPage;

  try {
    const countProducts = await prisma.products.count({
      where: {
        name: query || undefined
      }
    }); // Talvez passar pra outro metodo, evitando toda request

    const products = await prisma.products.findMany({
      skip: skip,
      take: take,
      where: {
        name: query || undefined
      }
    });

    const formatedProducts = products.map(p => ({...p, createdAt: format(p.createdAt, "dd/MM/yyyy HH:mm:ss"), updatedAt: format(p.updatedAt, "dd/MM/yyyy HH:mm:ss")})) // Formato br
    return {
      products: formatedProducts,
      count: countProducts
    }; // Tipar bem o retorno
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}
