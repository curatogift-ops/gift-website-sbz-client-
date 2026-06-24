import api from '@/lib/api';

export type CorporateEnquiryPayload = {
  name: string;
  phone: string;
  email: string;
  company: string;
  quantity: string;
  message?: string;
  productName?: string;
  productSlug?: string;
  categoryName?: string;
  categorySlug?: string;
  source?: string;
};

export type CorporateEnquiryResult = {
  success: boolean;
  message: string;
};

const SUCCESS_MESSAGE =
  'Thank you for your enquiry. Our team will contact you shortly.';

export async function submitCorporateEnquiry(
  payload: CorporateEnquiryPayload,
): Promise<CorporateEnquiryResult> {
  try {
    await api.post('/corporate-enquiries', {
      ...payload,
      submittedAt: new Date().toISOString(),
    });
    return { success: true, message: SUCCESS_MESSAGE };
  } catch (error) {
    const status = (error as { response?: { status?: number } })?.response?.status;
    if (status === 404 || status === 501) {
      console.warn('[enquiry] API endpoint not configured — storing locally for demo');
      const key = 'corporate_enquiries';
      const existing = JSON.parse(localStorage.getItem(key) ?? '[]') as CorporateEnquiryPayload[];
      localStorage.setItem(key, JSON.stringify([...existing, payload]));
      return { success: true, message: SUCCESS_MESSAGE };
    }

    return {
      success: false,
      message: 'Something went wrong. Please try again or contact us on WhatsApp.',
    };
  }
}
