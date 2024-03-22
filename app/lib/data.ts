'use server' // Assim posso chamar a vontade em um cliente, sem a request passar por client e ser no server
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

  console.log("Query", query);
  console.log("Page", page);
  console.log("Per", perPage);

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

    const formatedProducts = products
    .map(p => (
      {
        ...p,
        edit: p,
        delete: {id: p.id, name: p.name},
        createdAt: format(p.createdAt, "dd/MM/yyyy HH:mm:ss"),
        updatedAt: format(p.updatedAt, "dd/MM/yyyy HH:mm:ss")
      }
    ))
    return {
      products: formatedProducts,
      count: countProducts
    }; // Tipar bem o retorno
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}
