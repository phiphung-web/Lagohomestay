export function SkipLink({ targetId = "noi-dung-chinh" }: { targetId?: string }) {
  return <a href={`#${targetId}`} className="skip-link">Bỏ qua điều hướng</a>;
}
