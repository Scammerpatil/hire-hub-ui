export default function PageTitle({ title }: { title: string }) {
  return (
    <div className="py-4 text-center bg-primary/20 space-y-2">
      <h1 className="text-3xl font-bold uppercase">⭐{title}⭐</h1>
      <span className="italic font-bold text-base-content/60">
        HireHub | Hire Smarter. Faster. Better.
      </span>
    </div>
  );
}
