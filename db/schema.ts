import { randomUUID } from 'crypto';
import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const id = () =>
    text('id')
      .primaryKey()
      .$default(() => randomUUID())
  
  const createdAt = () =>
    text('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull()

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
});


export const customers = sqliteTable('customers', {
    id: id(),
    name: text('name').notNull(),
    email: text('email').unique().notNull(),
});

export const invoices = sqliteTable('invoices', {
    id: id(),
    customer_id: text('customer_id').notNull(),
    amount: integer('amount').notNull(),
    status: text('status').notNull(),
    date: createdAt()
});

export const revenue = sqliteTable('revenue', {
    month: text('month').notNull(),
    revenue: integer('revenue').notNull()
});

export const customersRelations = relations(customers,( {many})=>({
    invoices: many(invoices)
}))

export const invoicesRelations = relations(invoices,({one})=>({
    customers: one(customers,{
        fields: [invoices.customer_id],
        references: [customers.id]
    })
}))

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertPost = typeof invoices.$inferInsert;
export type SelectPost = typeof invoices.$inferSelect;

export type InsertCustomer = typeof customers.$inferInsert;
export type SelectCustomer = typeof customers.$inferSelect;

export type InsertInvoice = typeof invoices.$inferInsert;
export type SelectInvoice = typeof invoices.$inferSelect;

export type InsertRevenue = typeof revenue.$inferInsert;
export type SelectRevenue = typeof revenue.$inferSelect;