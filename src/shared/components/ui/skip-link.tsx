export function SkipLink({ targetId = "noi-dung-chinh", label = "Bỏ qua điều hướng" }: { targetId?: string; label?: string }) {
  return <a href={`#${targetId}`} className="skip-link">{label}</a>;
}
