import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { CorporateProduct } from '@/config/corporateGiftingData';

/**
 * Product Details accordion — copied AS-IS from CorporateProductPage for Boxup / hamper builder.
 */
export default function ProductDetailsAccordion({
  product,
  className = 'corp-product-accordion mt-5 flex w-full flex-col sm:mt-6',
}: {
  product: CorporateProduct;
  className?: string;
}) {
  return (
    <Accordion defaultValue={['contents']} className={className}>
      <AccordionItem value="contents">
        <AccordionTrigger className="corp-accordion-trigger">
          {product.contentsLabel}
        </AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc space-y-1.5 pl-5 text-[13px] leading-relaxed text-muted-foreground">
            {product.contents.map((item) => (
              <li key={item.name}>{item.name}</li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="description">
        <AccordionTrigger className="corp-accordion-trigger">Description</AccordionTrigger>
        <AccordionContent className="text-[13px] leading-relaxed text-muted-foreground">
          {product.description}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="know-more">
        <AccordionTrigger className="corp-accordion-trigger">Click to know More</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc space-y-1.5 pl-5 text-[13px] leading-relaxed text-muted-foreground">
            {product.brandingOptions.map((option) => (
              <li key={option}>{option}</li>
            ))}
          </ul>
          <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{product.knowMore}</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="shipping">
        <AccordionTrigger className="corp-accordion-trigger">
          Shipping &amp; Fulfillment
        </AccordionTrigger>
        <AccordionContent className="text-[13px] leading-relaxed text-muted-foreground">
          {product.shippingInfo}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="assistance">
        <AccordionTrigger className="corp-accordion-trigger">Assistance</AccordionTrigger>
        <AccordionContent className="text-[13px] leading-relaxed text-muted-foreground">
          {product.assistanceInfo}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
