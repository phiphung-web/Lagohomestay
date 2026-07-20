export const PHONE_PATTERN = /^[0-9+().\s-]{9,20}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactField = "fullName" | "phone" | "email" | "consent";
export type ContactErrors = Partial<Record<ContactField, string>>;

export function validateBookingContact(input: { fullName: string; phone: string; email: string; consent: boolean }): ContactErrors {
  const errors: ContactErrors = {};
  if (input.fullName.trim().length < 2) errors.fullName = "Vui lòng nhập họ tên đầy đủ.";
  if (!PHONE_PATTERN.test(input.phone.trim())) errors.phone = "Số điện thoại chưa đúng. Ví dụ: 090 123 4567.";
  if (input.email.trim() && !EMAIL_PATTERN.test(input.email.trim())) errors.email = "Email chưa đúng định dạng.";
  if (!input.consent) errors.consent = "Bạn cần đồng ý để LAKA xử lý yêu cầu đặt căn.";
  return errors;
}

export function validateLookupPhone(phone: string) {
  if (!phone.trim()) return "Vui lòng nhập số điện thoại đã dùng khi đặt.";
  if (!PHONE_PATTERN.test(phone.trim())) return "Số điện thoại chưa đúng. Ví dụ: 090 123 4567.";
  return "";
}
