import { COMPANY_INFO } from '@/config/companyInfo';

export default function WhatsAppWidget() {
  return (
    <a
      href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-4 z-[90] flex items-center justify-center drop-shadow-xl transition-transform hover:scale-110 md:bottom-8 md:right-8"
      aria-label="Chat on WhatsApp"
    >
      <img 
        src="https://s3.ap-south-1.amazonaws.com/cdn.limechat.ai/packs/js/whatsapp_widget/media/LC_WA.png" 
        alt="WhatsApp Chat"
        className="h-14 w-14 object-contain md:h-16 md:w-16"
      />
    </a>
  );
}
