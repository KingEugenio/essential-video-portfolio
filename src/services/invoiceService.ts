/**
 * Invoice & Commercial Billing Service
 * Handles invoice calculations, payment links, and printable invoice documents.
 */

import { Invoice, InvoiceLineItem, SupportedCurrency } from '../types';
import { apiClient } from './apiClient';
import { formatCurrency } from './i18n';

export class InvoiceService {
  public static calculateTotals(
    items: InvoiceLineItem[],
    taxRate: number = 0,
    depositAmount: number = 0
  ) {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice || 0), 0);
    const taxAmount = (subtotal * (taxRate || 0)) / 100;
    const total = subtotal + taxAmount;
    const balanceDue = Math.max(0, total - (depositAmount || 0));

    return {
      subtotal,
      taxAmount,
      total,
      balanceDue,
    };
  }

  public static async createInvoice(invoice: Partial<Invoice>): Promise<Invoice | null> {
    try {
      const res = await apiClient.createInvoice(invoice);
      if (res.success && res.data) return res.data;
    } catch (e) {
      console.warn('[InvoiceService] Failed to create invoice:', e);
    }
    return null;
  }

  public static async getInvoices(): Promise<Invoice[]> {
    try {
      const res = await apiClient.getInvoices();
      if (res.success && Array.isArray(res.data)) return res.data;
    } catch (e) {
      console.warn('[InvoiceService] Failed to fetch invoices:', e);
    }
    return [];
  }

  public static printInvoice(invoice: Invoice, brandName: string = 'Eugene Visuals') {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const itemsHtml = invoice.items
      .map(
        (item) => `
        <tr style="border-bottom: 1px solid #27272a;">
          <td style="padding: 12px 8px; text-align: left;">${item.description}</td>
          <td style="padding: 12px 8px; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px 8px; text-align: right;">${formatCurrency(item.unitPrice, invoice.currency)}</td>
          <td style="padding: 12px 8px; text-align: right; font-weight: 600;">${formatCurrency(item.amount, invoice.currency)}</td>
        </tr>
      `
      )
      .join('');

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice ${invoice.invoiceNumber} - ${brandName}</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #09090b; color: #f4f4f5; margin: 0; padding: 40px; }
            .container { max-width: 800px; margin: 0 auto; background: #18181b; padding: 40px; border-radius: 12px; border: 1px solid #27272a; }
            .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; border-bottom: 1px solid #27272a; padding-bottom: 20px; }
            .badge { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: bold; text-transform: uppercase; background: ${
              invoice.status === 'paid' ? '#10b981' : invoice.status === 'partially_paid' ? '#f59e0b' : '#6366f1'
            }; color: #000; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { text-align: left; padding: 10px 8px; color: #a1a1aa; font-size: 12px; text-transform: uppercase; border-bottom: 1px solid #3f3f46; }
            .summary { margin-top: 30px; display: flex; justify-content: flex-end; }
            .summary-table { width: 300px; }
            .summary-row { display: flex; justify-content: space-between; padding: 6px 0; color: #a1a1aa; }
            .summary-row.total { font-size: 18px; font-weight: bold; color: #fff; border-top: 1px solid #3f3f46; padding-top: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div>
                <h1 style="margin: 0; font-size: 24px; letter-spacing: -0.5px;">${brandName}</h1>
                <p style="margin: 4px 0 0 0; color: #a1a1aa; font-size: 14px;">Commercial Post-Production & Color Studio</p>
              </div>
              <div style="text-align: right;">
                <h2 style="margin: 0; font-size: 20px; color: #fff;">${invoice.invoiceNumber}</h2>
                <div class="badge" style="margin-top: 6px;">${invoice.status.replace('_', ' ')}</div>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; margin-bottom: 30px; font-size: 14px;">
              <div>
                <strong style="color: #a1a1aa; font-size: 11px; text-transform: uppercase;">Billed To:</strong>
                <div style="font-weight: bold; margin-top: 4px; font-size: 16px;">${invoice.clientName}</div>
                ${invoice.clientCompany ? `<div>${invoice.clientCompany}</div>` : ''}
                <div style="color: #a1a1aa;">${invoice.clientEmail}</div>
                ${invoice.clientAddress ? `<div style="color: #71717a;">${invoice.clientAddress}</div>` : ''}
              </div>
              <div style="text-align: right;">
                <div><span style="color: #a1a1aa;">Issue Date:</span> ${invoice.createdAt.split('T')[0]}</div>
                <div><span style="color: #a1a1aa;">Due Date:</span> <strong style="color: #fff;">${invoice.dueDate}</strong></div>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th style="text-align: center;">Qty</th>
                  <th style="text-align: right;">Rate</th>
                  <th style="text-align: right;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div class="summary">
              <div class="summary-table">
                <div class="summary-row">
                  <span>Subtotal</span>
                  <span>${formatCurrency(invoice.subtotal, invoice.currency)}</span>
                </div>
                ${
                  invoice.taxRate > 0
                    ? `<div class="summary-row"><span>Tax (${invoice.taxRate}%)</span><span>${formatCurrency(invoice.taxAmount, invoice.currency)}</span></div>`
                    : ''
                }
                <div class="summary-row total">
                  <span>Total</span>
                  <span>${formatCurrency(invoice.total, invoice.currency)}</span>
                </div>
                ${
                  invoice.depositAmount > 0
                    ? `<div class="summary-row" style="color: #10b981;"><span>Deposit Paid</span><span>-${formatCurrency(invoice.depositAmount, invoice.currency)}</span></div>`
                    : ''
                }
                <div class="summary-row" style="font-size: 16px; font-weight: bold; color: #f59e0b; margin-top: 8px;">
                  <span>Balance Due</span>
                  <span>${formatCurrency(invoice.balanceDue, invoice.currency)}</span>
                </div>
              </div>
            </div>

            ${
              invoice.notes
                ? `<div style="margin-top: 40px; padding: 16px; background: #27272a; border-radius: 8px; font-size: 13px; color: #d4d4d8;">
                     <strong style="display: block; margin-bottom: 4px; color: #fff;">Payment Notes:</strong>
                     ${invoice.notes}
                   </div>`
                : ''
            }
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  }
}
