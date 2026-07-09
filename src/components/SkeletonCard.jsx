export default function SkeletonCard() {
  return (
    <div className="card p-5">
      <div className="skeleton h-6 w-3/4" />
      <div className="skeleton mt-2 h-3 w-1/2" />
      <div className="mt-5 space-y-2">
        <div className="skeleton h-3 w-2/3" />
        <div className="skeleton h-3 w-1/2" />
        <div className="skeleton h-3 w-3/5" />
      </div>
      <div className="skeleton mt-6 h-10 w-full" />
    </div>
  );
}