export default function Loading() {
  return (
    <div className="h-screen w-screen flex justify-center items-center gap-2">
      <div className="w-4 h-4 rounded-full bg-amaranth animate-bounce [animation-delay:.7s]"></div>
      <div className="w-4 h-4 rounded-full bg-amaranth animate-bounce [animation-delay:.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-amaranth animate-bounce [animation-delay:.7s]"></div>
    </div>
  );
}
