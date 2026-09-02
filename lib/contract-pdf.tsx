import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Link,
  renderToBuffer,
} from "@react-pdf/renderer";
import type { Inquiry } from "./inquiries";
import { calculateDeposit } from "./pricing";

// Keep these in sync with the values in lib/contract.ts
const BUSINESS_NAME = "Lasting Moments Booth, LLC";
const BUSINESS_EMAIL = "info@lastingmomentsboothllc.com";
const GOVERNING_STATE = "Georgia";
const SITE_URL =
  process.env.SITE_URL || "https://photobooth-website-rho.vercel.app";
const STANDARD_BOOKING_WEEKS = "4 to 6 weeks";
const KIDS_PARTY_BOOKING_WEEKS = "2 weeks";
const CANCELLATION_EXCEPTION_DAYS = 7;

const MAROON = "#5C0F28";
const GOLD = "#A9791F";
const CREAM = "#FFFDF8";
const TEXT = "#222222";
const MUTED = "#5A5A5A";
const BORDER = "#D9C48A";

function formatDate(iso?: string): string {
  if (!iso) return "\u2014";
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateTime(ms?: number): string {
  if (!ms) return "\u2014";
  return new Date(ms).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatBalanceDueDate(eventDate?: string): string {
  if (!eventDate) return "\u2014";
  const d = new Date(`${eventDate}T00:00:00`);
  d.setDate(d.getDate() - 7);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: CREAM,
    paddingHorizontal: 36,
    paddingTop: 0,
    paddingBottom: 40,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: TEXT,
  },
  headerImage: {
    width: "100%",
    marginBottom: 14,
  },
  title: {
    fontFamily: "Helvetica-Bold",
    fontSize: 15,
    textAlign: "center",
    color: TEXT,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  intro: {
    textAlign: "center",
    color: MUTED,
    fontSize: 8.5,
    lineHeight: 1.4,
    marginBottom: 14,
    paddingHorizontal: 20,
  },
  columns: {
    flexDirection: "row",
    gap: 16,
  },
  col: {
    flex: 1,
  },
  sectionBar: {
    backgroundColor: MAROON,
    color: "#FFFFFF",
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginBottom: 6,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 3,
  },
  label: {
    fontFamily: "Helvetica-Bold",
    width: 82,
    fontSize: 8.5,
  },
  value: {
    fontSize: 8.5,
    flex: 1,
  },
  bodyText: {
    fontSize: 8.5,
    lineHeight: 1.4,
    marginBottom: 4,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 3,
  },
  bulletDot: {
    width: 8,
    fontSize: 8.5,
    color: MAROON,
  },
  bulletText: {
    fontSize: 8.5,
    flex: 1,
    lineHeight: 1.4,
  },
  table: {
    borderWidth: 1,
    borderColor: BORDER,
    marginBottom: 6,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  tableRowLast: {
    flexDirection: "row",
  },
  tableCellLabel: {
    flex: 1.4,
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    padding: 5,
  },
  tableCellValue: {
    flex: 1,
    fontSize: 8.5,
    padding: 5,
    textAlign: "right",
  },
  adviceBox: {
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  adviceTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: MAROON,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  adviceMain: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    color: TEXT,
    textAlign: "center",
    marginBottom: 4,
  },
  adviceSub: {
    fontSize: 7.5,
    color: MUTED,
    textAlign: "center",
    lineHeight: 1.3,
  },
  receiptBox: {
    borderWidth: 1.5,
    borderColor: MAROON,
    borderRadius: 4,
    padding: 12,
    marginTop: 12,
  },
  receiptTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: MAROON,
    marginBottom: 6,
  },
  receiptRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  receiptLabel: {
    fontSize: 8.5,
    color: MUTED,
  },
  receiptValue: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 36,
    right: 36,
    textAlign: "center",
    fontSize: 7.5,
    color: MUTED,
  },
   link: {
    color: MAROON,
  },
  payBox: {
    borderWidth: 2,
    borderColor: GOLD,
    borderRadius: 4,
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#FBF4E4",
  },
  payBoxTitle: {
    fontSize: 9,
    marginBottom: 6,
  },
  payButton: {
    backgroundColor: MAROON,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  payButtonText: {
    color: "#FFFFFF",
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  paySubtext: {
    fontSize: 7,
    color: MUTED,
    marginTop: 6,
  },
});

function SectionBar({ children }: { children: string }) {
  return (
    <View style={styles.sectionBar}>
      <Text>{children}</Text>
    </View>
  );
}

export function ContractDocument({ inquiry }: { inquiry: Inquiry }) {
  const { deposit, balance } = calculateDeposit(inquiry.estimate);

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Image
          src={`${SITE_URL}/images/contract-header.png`}
          style={styles.headerImage}
        />

        <Text style={styles.title}>DEPOSIT RECEIPT & BOOKING CONFIRMATION</Text>
                <Text style={styles.intro}>
          This confirms {BUSINESS_NAME} ("Company") has received Client's
          deposit payment below, confirming the booking of photo booth rental
          services for the event detailed here, under the terms of the
          Booking Contract &amp; Service Agreement.
        </Text>

        <View style={styles.columns}>
          <View style={styles.col}>
            <SectionBar>1. BOOKING DETAILS</SectionBar>
            <View style={styles.row}>
              <Text style={styles.label}>Client Name</Text>
              <Text style={styles.value}>{inquiry.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Client Email</Text>
              <Text style={styles.value}>{inquiry.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Event Date</Text>
              <Text style={styles.value}>{formatDate(inquiry.eventDate)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Event Type</Text>
              <Text style={styles.value}>{inquiry.eventType || "\u2014"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Package</Text>
              <Text style={styles.value}>{inquiry.packageTier || "\u2014"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Add-ons</Text>
              <Text style={styles.value}>
                {inquiry.addOns?.length ? inquiry.addOns.join(", ") : "\u2014"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Guest Count</Text>
              <Text style={styles.value}>{inquiry.guestCount || "\u2014"}</Text>
            </View>

            <SectionBar>2. PAYMENT TERMS</SectionBar>
            <Text style={styles.bodyText}>
              A deposit of 50% of the total cost of the items selected is due
              at the time of booking to reserve the event date. The remaining
              balance is due in full no later than 7 days prior to the event
              date.
            </Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellLabel}>Total Cost of Items Selected</Text>
                <Text style={styles.tableCellValue}>
                  ${inquiry.estimate.toLocaleString()}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellLabel}>Deposit Received (50%)</Text>
                <Text style={styles.tableCellValue}>
                  ${deposit.toLocaleString()}
                </Text>
              </View>
              <View style={styles.tableRowLast}>
                <Text style={styles.tableCellLabel}>Balance Due (7 days before event)</Text>
                <Text style={styles.tableCellValue}>
                  ${balance.toLocaleString()}
                </Text>
              </View>
            </View>

            <View style={styles.adviceBox}>
              <Text style={styles.adviceTitle}>ADVANCE BOOKING REQUIREMENT</Text>
              <Text style={styles.adviceMain}>
                ALL BOOKINGS MUST BE MADE {STANDARD_BOOKING_WEEKS.toUpperCase()}
              </Text>
              <Text style={styles.adviceSub}>
                The only exception is children's birthday parties, which
                require a minimum of {KIDS_PARTY_BOOKING_WEEKS} advance
                notice. Bookings made with less notice than required are
                subject to Company's availability and approval.
              </Text>
            </View>
          </View>

          <View style={styles.col}>
            <SectionBar>3. CANCELLATION AND REFUND POLICY</SectionBar>
            <Text style={styles.bodyText}>
              The only cancellation and refund exception under this Agreement
              is for severe weather or a medical emergency as described
              below.
            </Text>
            <Text style={[styles.bodyText, { fontFamily: "Helvetica-Bold", color: MAROON }]}>
              EXCEPTION: SEVERE WEATHER OR MEDICAL EMERGENCY
            </Text>
            <Text style={styles.bodyText}>
              If a cancellation made less than {CANCELLATION_EXCEPTION_DAYS}{" "}
              days before the event is due to severe weather or a medical
              emergency, and Client submits supporting documentation (such as
              a weather advisory, medical note, or hospital record) to
              Company, Client may choose one of the following instead of
              forfeiting funds paid:
            </Text>
            <View style={styles.bullet}>
              <Text style={styles.bulletDot}>{"\u2022"}</Text>
              <Text style={styles.bulletText}>A 50% refund of funds paid, or</Text>
            </View>
            <View style={styles.bullet}>
              <Text style={styles.bulletDot}>{"\u2022"}</Text>
              <Text style={styles.bulletText}>
                A full credit of funds paid toward rescheduling the event to
                a new date, subject to Company's availability.
              </Text>
            </View>
            <Text style={styles.bodyText}>
              Documentation must be submitted to Company within 7 days of the
              cancellation for this exception to apply.
            </Text>

            <SectionBar>4. HOW TO CANCEL</SectionBar>
            <Text style={styles.bodyText}>
              Cancellation requests must be submitted in writing to{" "}
              <Text style={styles.link}>{BUSINESS_EMAIL}</Text>. The
              cancellation date is the date Company receives the written
              request, not the date Client decides to cancel.
            </Text>

            <SectionBar>5. GENERAL TERMS</SectionBar>
            <Text style={styles.bodyText}>
              This Agreement is between Company and Client only and is not
              transferable without Company's written consent.
            </Text>
            <Text style={styles.bodyText}>
              Company will make commercially reasonable efforts to provide
              the services described above, but is not liable for delays or
              failures caused by circumstances beyond its reasonable
              control.
            </Text>
            <Text style={styles.bodyText}>
              This Agreement is governed by the laws of the State of{" "}
              {GOVERNING_STATE}.
            </Text>

            <View style={styles.receiptBox}>
              <Text style={styles.receiptTitle}>6. AGREEMENT CONFIRMATION</Text>
              <Text style={[styles.bodyText, { marginBottom: 8 }]}>
                By submitting the deposit payment below, Client acknowledged
                having read, understood, and agreed to the terms of the
                Booking Contract &amp; Service Agreement, including the
                cancellation and refund policy above.
              </Text>
              <View style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Deposit Received</Text>
                <Text style={styles.receiptValue}>
                  ${deposit.toLocaleString()}
                </Text>
              </View>
              <View style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Date Received</Text>
                <Text style={styles.receiptValue}>
                  {formatDateTime(inquiry.depositPaidAt)}
                </Text>
              </View>
                           <View style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Payment Processor</Text>
                <Text style={styles.receiptValue}>Clover</Text>
              </View>
            </View>

            <View style={styles.payBox}>
              <Text style={styles.payBoxTitle}>
                Remaining Balance: ${balance.toLocaleString()} — Due {formatBalanceDueDate(inquiry.eventDate)}
              </Text>
              <Link
                src={`${SITE_URL}/api/checkout/${inquiry.id}?type=final`}
                style={styles.payButton}
              >
                <Text style={styles.payButtonText}>
                  Pay Final Balance — ${balance.toLocaleString()}
                </Text>
              </Link>
              <Text style={styles.paySubtext}>
                Secure payment powered by Clover
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.footer}>
          Full Terms of Service: {SITE_URL}/terms  \u2022  Privacy Policy:{" "}
          {SITE_URL}/privacy  \u2022  {BUSINESS_EMAIL}
        </Text>
      </Page>
    </Document>
  );
}
export function ContractPreviewDocument({ inquiry }: { inquiry: Inquiry }) {
  const { deposit, balance } = calculateDeposit(inquiry.estimate);

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Image
          src={`${SITE_URL}/images/contract-header.png`}
          style={styles.headerImage}
        />

        <Text style={styles.title}>BOOKING CONTRACT & SERVICE AGREEMENT</Text>
        <Text style={styles.intro}>
  This Booking Contract & Service Agreement outlines the terms for
  your upcoming event with {BUSINESS_NAME}. Please review the details
  below, then use the deposit payment link in your confirmation email
  to secure your date.
</Text>

        <View style={styles.columns}>
          <View style={styles.col}>
            <SectionBar>1. BOOKING DETAILS</SectionBar>
            <View style={styles.row}>
              <Text style={styles.label}>Client Name</Text>
              <Text style={styles.value}>{inquiry.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Client Email</Text>
              <Text style={styles.value}>{inquiry.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Event Date</Text>
              <Text style={styles.value}>{formatDate(inquiry.eventDate)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Event Type</Text>
              <Text style={styles.value}>{inquiry.eventType || "\u2014"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Package</Text>
              <Text style={styles.value}>{inquiry.packageTier || "\u2014"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Add-ons</Text>
              <Text style={styles.value}>
                {inquiry.addOns?.length ? inquiry.addOns.join(", ") : "\u2014"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Guest Count</Text>
              <Text style={styles.value}>{inquiry.guestCount || "\u2014"}</Text>
            </View>

            <SectionBar>2. PAYMENT TERMS</SectionBar>
            <Text style={styles.bodyText}>
              A deposit of 50% of the total cost of the items selected is due
              at the time of booking to reserve the event date. The remaining
              balance is due in full no later than 7 days prior to the event
              date.
            </Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellLabel}>Total Cost of Items Selected</Text>
                <Text style={styles.tableCellValue}>
                  ${inquiry.estimate.toLocaleString()}
                </Text>
              </View>
                            <View style={styles.tableRow}>
                <Text style={styles.tableCellLabel}>Deposit Due Now (50%)</Text>
                <Text style={styles.tableCellValue}>
                  ${deposit.toLocaleString()}
                </Text>
              </View>
              <View style={styles.tableRowLast}>
                <Text style={styles.tableCellLabel}>
                  Balance Due ({formatBalanceDueDate(inquiry.eventDate)})
                </Text>
                <Text style={styles.tableCellValue}>
                  ${balance.toLocaleString()}
                </Text>
              </View>
            </View>

            <View style={styles.payBox}>
              <Text style={styles.payBoxTitle}>Ready to secure your date?</Text>
              <Link
                src={`${SITE_URL}/api/checkout/${inquiry.id}`}
                style={styles.payButton}
              >
                <Text style={styles.payButtonText}>
                  Pay Deposit Now — ${deposit.toLocaleString()}
                </Text>
              </Link>
              <Text style={styles.paySubtext}>
                Secure payment powered by Clover
              </Text>
            </View>

            <View style={styles.adviceBox}>
            </View>

            <View style={styles.adviceBox}>
              <Text style={styles.adviceTitle}>ADVANCE BOOKING REQUIREMENT</Text>
              <Text style={styles.adviceMain}>
                ALL BOOKINGS MUST BE MADE {STANDARD_BOOKING_WEEKS.toUpperCase()}
              </Text>
              <Text style={styles.adviceSub}>
                The only exception is children's birthday parties, which
                require a minimum of {KIDS_PARTY_BOOKING_WEEKS} advance
                notice. Bookings made with less notice than required are
                subject to Company's availability and approval.
              </Text>
            </View>
          </View>

          <View style={styles.col}>
            <SectionBar>3. CANCELLATION AND REFUND POLICY</SectionBar>
            <Text style={styles.bodyText}>
              The only cancellation and refund exception under this Agreement
              is for severe weather or a medical emergency as described
              below.
            </Text>
            <Text style={[styles.bodyText, { fontFamily: "Helvetica-Bold", color: MAROON }]}>
              EXCEPTION: SEVERE WEATHER OR MEDICAL EMERGENCY
            </Text>
            <Text style={styles.bodyText}>
              If a cancellation made less than {CANCELLATION_EXCEPTION_DAYS}{" "}
              days before the event is due to severe weather or a medical
              emergency, and Client submits supporting documentation (such as
              a weather advisory, medical note, or hospital record) to
              Company, Client may choose one of the following instead of
              forfeiting funds paid:
            </Text>
            <View style={styles.bullet}>
              <Text style={styles.bulletDot}>{"\u2022"}</Text>
              <Text style={styles.bulletText}>A 50% refund of funds paid, or</Text>
            </View>
            <View style={styles.bullet}>
              <Text style={styles.bulletDot}>{"\u2022"}</Text>
              <Text style={styles.bulletText}>
                A full credit of funds paid toward rescheduling the event to
                a new date, subject to Company's availability.
              </Text>
            </View>
            <Text style={styles.bodyText}>
              Documentation must be submitted to Company within 7 days of the
              cancellation for this exception to apply.
            </Text>

            <SectionBar>4. HOW TO CANCEL</SectionBar>
            <Text style={styles.bodyText}>
              Cancellation requests must be submitted in writing to{" "}
              <Text style={styles.link}>{BUSINESS_EMAIL}</Text>. The
              cancellation date is the date Company receives the written
              request, not the date Client decides to cancel.
            </Text>

            <SectionBar>5. GENERAL TERMS</SectionBar>
            <Text style={styles.bodyText}>
              This Agreement is between Company and Client only and is not
              transferable without Company's written consent.
            </Text>
            <Text style={styles.bodyText}>
              Company will make commercially reasonable efforts to provide
              the services described above, but is not liable for delays or
              failures caused by circumstances beyond its reasonable
              control.
            </Text>
            <Text style={styles.bodyText}>
              This Agreement is governed by the laws of the State of{" "}
              {GOVERNING_STATE}.
            </Text>

            <View style={styles.receiptBox}>
              <Text style={styles.receiptTitle}>6. AGREEMENT CONFIRMATION</Text>
              <Text style={[styles.bodyText, { marginBottom: 8 }]}>
                By submitting the deposit payment below, Client acknowledged
                having read, understood, and agreed to the terms of the
                Booking Contract &amp; Service Agreement, including the
                cancellation and refund policy above.
              </Text>
              <View style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Deposit Received</Text>
                <Text style={styles.receiptValue}>
                  ${deposit.toLocaleString()}
                </Text>
              </View>
              <View style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Date Received</Text>
                <Text style={styles.receiptValue}>
                  {formatDateTime(inquiry.depositPaidAt)}
                </Text>
              </View>
              <View style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Payment Processor</Text>
                <Text style={styles.receiptValue}>Clover</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.footer}>
          Full Terms of Service: {SITE_URL}/terms  \u2022  Privacy Policy:{" "}
          {SITE_URL}/privacy  \u2022  {BUSINESS_EMAIL}
        </Text>
      </Page>
    </Document>
  );
}

export async function generateContractPdfBuffer(
  inquiry: Inquiry
): Promise<Buffer> {
  return renderToBuffer(<ContractDocument inquiry={inquiry} />);
}
export async function generateContractPreviewPdfBuffer(
  inquiry: Inquiry
): Promise<Buffer> {
  return renderToBuffer(<ContractPreviewDocument inquiry={inquiry} />);
}