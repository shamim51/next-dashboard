'use server'

import { fetchFilteredInvoices, fetchInvoicesPages } from "@/app/lib/dataDrizzle"

export default async function test() {

    fetchInvoicesPages()
}
