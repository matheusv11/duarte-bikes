'use server' // Assim posso chamar a vontade em um cliente, sem a request passar por client e ser no server
import { unstable_noStore as noStore } from 'next/cache';
import prisma from './prisma';
import { endOfDay, endOfMonth, startOfMonth, format, startOfDay, parseISO } from 'date-fns';
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
        soldValue: true,
        buyedValue: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
   
    return products
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchProducts({query = '', page = 1, perPage = 100 }: FetchProducts) {
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
          buyedValue: valueCurrencyMask(p.buyedValue.toString()),
          soldValue: valueCurrencyMask(p.soldValue.toString()),
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

// Mexer no formatedProducts
export async function fetchSelledProducts({query, page = 1, perPage = 100, startDate, endDate}: FetchProducts) {
  noStore();

  const skip = (page - 1) * perPage;
  const take = perPage;


  const commonWhere = {
    product: {
      name: query || undefined,
    },
    selledAt:{
      gte: startDate ? startOfDay(parseISO(startDate)) : startOfMonth(new Date()),
      lte: endDate ? endOfDay(parseISO(endDate)) : endOfMonth(new Date()),
    }
    // selledAt: startDate && endDate ? {
    //   gte: startDate ? startOfDay(parseISO(startDate)) : undefined,
    //   lte: endDate ? endOfDay(parseISO(endDate)) : undefined,
    // } : undefined
  } 

  try {
    const countProducts = await prisma.selledProducts.aggregate({
      where: commonWhere,
      _count: {
        _all: true
      },
      _sum: {
        // productBuyedValue: true,
        // productSoldValue: true,
        liquidValue: true,
        soldValue: true
      },
    }); // Talvez passar pra outro metodo, evitando toda request

    const products = await prisma.selledProducts.findMany({
      skip: skip,
      take: take,
      where: commonWhere,
      orderBy: {
        createdAt: 'desc'
      },
    });

    const formatedProducts = products
    .map(p => (
      {
        ...p,
        edit: {
          ...p,
          product: {
            id: p.id,
            name: p.productName,
            buyedValue: p.productBuyedValue
            // soldValue: valueCurrencyMask(p.soldValue.toString()),
          },
          soldValue: valueCurrencyMask(p.soldValue.toString()),
          date: p.selledAt
        },
        delete: {id: p.id, name: p.productName},
        createdAt: format(p.selledAt, "dd/MM/yyyy HH:mm:ss"),
      }
    ))
    return {
      liquidValue: countProducts._sum.liquidValue,
      totalValue: countProducts._sum.soldValue,
      products: formatedProducts,
      count: countProducts._count._all
    }; // Tipar bem o retorno
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchCustomers({query = '', page = 1, perPage = 100 }: FetchProducts) {
  noStore();

  const skip = (page - 1) * perPage;
  const take = perPage;

  const commonWhere = {};
  

  try {
    const countCustomers = await prisma.users.count({
      where: {
        kind: 'user',
        name: {
          contains: query,
          mode: 'insensitive'
        } || undefined
      }
    });

    const customers = await prisma.users.findMany({
      skip: skip,
      take: take,
      where: {
        kind: 'user',
        name: {
          contains: query,
          mode: 'insensitive'
        } || undefined
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    console.log("Customers", customers);
    
    const formatedCustomers = customers
    .map(p => (
      {
        ...p,
        edit: {
          ...p,
          
        },
        delete: {id: p.id, name: p.name},
        createdAt: format(p.createdAt, "dd/MM/yyyy HH:mm:ss"),
        updatedAt: format(p.updatedAt, "dd/MM/yyyy HH:mm:ss")
      }
    ))
    return {
      customers: formatedCustomers,
      count: countCustomers
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchBikes({query = '', page = 1, perPage = 100 }: FetchProducts) {
  noStore();

  const skip = (page - 1) * perPage;
  const take = perPage;

  try {
    const countBikes = await prisma.bikes.count({
      where: {
        name: {
          contains: query,
          mode: 'insensitive'
        } || undefined
      }
    });

    const bikes = await prisma.bikes.findMany({
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

    const formatedBikes = bikes
    .map(p => (
      {
        ...p,
        edit: {
          ...p,
          quantity: valueOnlyDigits(p.quantity.toString())
        },
        delete: {id: p.id, name: p.name},
        createdAt: format(p.createdAt, "dd/MM/yyyy HH:mm:ss"),
        updatedAt: format(p.updatedAt, "dd/MM/yyyy HH:mm:ss")
      }
    ))
    return {
      bikes: formatedBikes,
      count: countBikes
    }; // Tipar bem o retorno
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}
