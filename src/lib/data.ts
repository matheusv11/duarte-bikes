'use server' // Assim posso chamar a vontade em um cliente, sem a request passar por client e ser no server
import { unstable_noStore as noStore } from 'next/cache';
import prisma from './prisma';
import { endOfDay, format, startOfDay, parseISO } from 'date-fns';
import { valueCurrencyMask, valueOnlyDigits } from './utils';
import { FetchProducts } from '@/src/types/products';


export async function fetchProductsToSale({ query = '' }) {
  noStore();

  try {
    const products = await prisma.products.findMany({
      take: 5,
      where: {
        name: {
          contains: query,
          mode: 'insensitive'
        } || undefined
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
   
    return products.map(p => ({ id: p.id, label: p.name }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchProducts({query = '', page = 1, perPage = 5 }: FetchProducts) {
  noStore();

  const skip = (page - 1) * perPage;
  const take = perPage;

  try {
    const countProducts = await prisma.products.count({
      where: {
        name: {
          contains: query,
          mode: 'insensitive'
        } || undefined
      }
    }); // Talvez passar pra outro metodo, evitando toda request

    const products = await prisma.products.findMany({
      skip: skip,
      take: take,
      where: {
        name: {
          contains: query,
          mode: 'insensitive'
        } || undefined
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const formatedProducts = products
    .map(p => (
      {
        ...p,
        edit: {
          ...p,
          buyed_value: valueCurrencyMask(p.buyed_value.toString()),
          sold_value: valueCurrencyMask(p.sold_value.toString()),
          quantity: valueOnlyDigits(p.quantity.toString())
        },
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


export async function fetchSelledProducts({query, page = 1, perPage = 5, startDate, endDate}: FetchProducts) {
  noStore();

  const skip = (page - 1) * perPage;
  const take = perPage;
  // Passar os parametros comuns na duas request pra uma const

  const commonWhere = {
    product: {
      name: query || undefined,
    },
    selledAt: startDate && endDate ? {
      gte: startDate ? startOfDay(parseISO(startDate)) : undefined,
      lte: endDate ? endOfDay(parseISO(endDate)) : undefined,
    } : undefined
  } 

  try {
    const countProducts = await prisma.selledProducts.count({
      where: commonWhere
    }); // Talvez passar pra outro metodo, evitando toda request

    const products = await prisma.selledProducts.findMany({
      skip: skip,
      take: take,
      where: commonWhere,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        product: {
          select: {
            name: true,
            sold_value: true
          }
        }
      }
    });

    const formatedProducts = products
    .map(p => (
      {
        ...p,
        edit: {
          product: {
            label: p.product?.name,
            id: p.productId
          },
          date: p.createdAt,
          quantity: p.quantity,
          sold_value: p.custom_sold_value || p.product?.sold_value,
        },
        delete: {id: p.id, name: p.product?.name},
        product_name: p.product?.name,
        product_value: p.product?.sold_value,
        sold_value: p.custom_sold_value || p.product?.sold_value,
        createdAt: format(p.selledAt, "dd/MM/yyyy HH:mm:ss"),
        // updatedAt: format(p.updatedAt, "dd/MM/yyyy HH:mm:ss")
      }
    ))
    return {
      totalValue: products.reduce((a, b) =>  a +  (b.custom_sold_value || b.product?.sold_value as any), 0),
      products: formatedProducts,
      count: countProducts
    }; // Tipar bem o retorno
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}
