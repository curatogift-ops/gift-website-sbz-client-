/** Red asterisk for mandatory form fields (works on light and dark backgrounds). */
export default function RequiredMark() {
  return (
    <span className="ml-0.5 text-[#E11D48]" aria-hidden>
      *
    </span>
  );
}
