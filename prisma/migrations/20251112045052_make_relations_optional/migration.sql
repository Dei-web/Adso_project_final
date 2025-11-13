-- DropForeignKey
ALTER TABLE "InvoiceDetail" DROP CONSTRAINT "InvoiceDetail_invoiceDetail_id_fkey";

-- AddForeignKey
ALTER TABLE "InvoiceDetail" ADD CONSTRAINT "InvoiceDetail_invoiceDetail_id_fkey" FOREIGN KEY ("invoiceDetail_id") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
