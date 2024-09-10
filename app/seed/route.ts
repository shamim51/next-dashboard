/*
import { users, invoices, customers, revenue } from '@/db/schema';
import { invoices as invoicelist, customers as customerList, revenue as revenueList, users as userlist } from '../lib/placeholder-data';
import {db} from '@/db/db'

async function seedUsers() {
  userlist.map(async (user) => {
  await db.insert(users).values({name: user.name, email: user.email, password: user.password})
  })

}
async function seedCustomers() {
  customerList.map(async (customer) => {
    await db.insert(customers).values({id:customer.id, name: customer.name, email: customer.email})
  })
}

async function seedInvoices() {
  invoicelist.map(async (invoice) => {
    await db.insert(invoices).values({customer_id: invoice.customer_id, amount: invoice.amount, status: invoice.status, date: invoice.date})
  })
}

async function seedRevenue() {
  revenueList.map(async (rev) => {
    await db.insert(revenue).values({month: rev.month, revenue: rev.revenue})
  })
}

export async function GET() {

  try {
    //await seedUsers();
    await seedCustomers();
    await seedInvoices();
    //await seedRevenue();

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}*/
