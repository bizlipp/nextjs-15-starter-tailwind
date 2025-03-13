import Link from "next/link";

export default function HoloDoor({ title, destination, disabled }) {
  return (
    <div
      className={`px-6 py-3 border-2 rounded-lg cursor-pointer transition-all 
      ${
        disabled
          ? "border-gray-600 text-gray-500 cursor-not-allowed"
          : "border-green-400 hover:bg-green-400 hover:text-black"
      }`}
    >
      {disabled ? (
        <span>{title}</span>
      ) : (
        <Link href={destination}>{title}</Link>
      )}
    </div>
  );
}
