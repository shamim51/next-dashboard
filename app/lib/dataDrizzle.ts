import {db} from '@/db/db'
import { customers, invoices,  revenue } from '@/db/schema';
import { count, eq, sum, like } from 'drizzle-orm';

export async function fetchRevenue() {
    try {
      // Artificially delay a response for demo purposes.
      // Don't do this in production :)

      console.log('Fetching revenue data...');
      await new Promise((resolve) => setTimeout(resolve, 3000));
  
      console.log('Fetching revenue data...');
      const data = await db.select().from(revenue)
    
      console.log('Data fetch completed after 3 seconds.');
  
       return data;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchLatestInvoices () {
    const data = await db.query.invoices.findMany({
        limit: 5,
        columns:{
            id: true,
            amount: true,
        
        },
        with:{
            customers: {
                columns:{
                    name: true,
                    email: true
                }
            }
        },
    })
    

    return data
}

export async function fetchCardData(){
    try{
        const noc =await db.select({count: count()}).from(customers)
        const nov =await db.select({count: count()}).from(invoices)
        const nopi = await db.select({value: sum(invoices.amount)}).from(invoices).where(eq(invoices.status, 'paid'))
        const nopendig = await db.select({ value: sum(invoices.amount) }).from(invoices).where(eq(invoices.status, 'pending'))

        console.log(noc)
        console.log(nov)

        console.log(typeof(noc[0].count))

        const numberOfCustomers = noc[0]?.count?.toString() || '0';
        const numberOfInvoices = nov[0]?.count?.toString() || '0';
        const totalPaidInvoices = nopi[0]?.value?.toString() || '0';
        const totalPendingInvoices = nopendig[0]?.value?.toString() || '0';

        console.log(numberOfCustomers)
        console.log(numberOfInvoices)
        console.log(totalPaidInvoices)
        console.log(totalPendingInvoices)

        return {
            numberOfInvoices,
            numberOfCustomers,
            totalPaidInvoices,
            totalPendingInvoices,
        }

    }catch(error){
        console.error('Database Error:', error);
        // throw new Error('Failed to fetch card data.');
    }
}

export async function fetchFilteredInvoices(
    query: string,
    currentPage: number,
  ) {
  
    try {
      const data = await db
      .select(
        {
          id: invoices.id,
          status: invoices.status,
          amount: invoices.amount,
          date: invoices.date,
          name: customers.name,
          email: customers.email,
        }

      )
      .from(invoices)
      .innerJoin(customers, eq(customers.id, invoices.customer_id))
      .where(like(customers.name, `${query}%`))
      .limit(6)
      // where(like(customers.email, `${query}%`))
 
    console.log(data)
    
      return data
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch invoices.');
    }
  }

  export async function fetchInvoicesPages() {
    const noOfInvoices = await db.select({count: count()}).from(invoices)
    const no = Math.ceil(Number(noOfInvoices[0].count)/6)
    console.log(no)
    console.log(typeof(no))
    return no
  }
