import api from '@/lib/api';
import { COMPANY_INFO } from '@/config/companyInfo';

export type CorporateEnquiryPayload = {
  name: string;
  phone: string;
  email: string;
  company: string;
  quantity?: string;
  message?: string;
  productName?: string;
  productSlug?: string;
  categoryName?: string;
  categorySlug?: string;
  tripType?: string;
  source?: string;
};

export type CorporateEnquiryResult = {
  success: boolean;
  message: string;
};

const SUCCESS_MESSAGE =
  'Thank you for your enquiry. Our team will contact you shortly.';

/** All enquiry forms target this inbox (API payload + local fallback metadata). */
export const ENQUIRY_RECIPIENT_EMAIL = COMPANY_INFO.email;

export async function submitCorporateEnquiry(
  payload: CorporateEnquiryPayload,
): Promise<CorporateEnquiryResult> {
  const body = {
    ...payload,
    recipientEmail: ENQUIRY_RECIPIENT_EMAIL,
    submittedAt: new Date().toISOString(),
  };

  try {
    await api.post('/corporate-enquiries', body);
    return { success: true, message: SUCCESS_MESSAGE };
  } catch (error) {
    const status = (error as { response?: { status?: number } })?.response?.status;
    if (status === 404 || status === 501 || !status) {
      console.warn(
        `[enquiry] API unavailable — storing locally for ${ENQUIRY_RECIPIENT_EMAIL}`,
      );
      const key = 'corporate_enquiries';
      const existing = JSON.parse(localStorage.getItem(key) ?? '[]') as unknown[];
      localStorage.setItem(key, JSON.stringify([...existing, body]));
      return { success: true, message: SUCCESS_MESSAGE };
    }

    return {
      success: false,
      message: 'Something went wrong. Please try again or contact us on WhatsApp.',
    };
  }
}
