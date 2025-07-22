import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex border border-stone-800">
      <div className="relative flex-1">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="border-r border-stone-800 object-cover"
        />
      </div>

      <div className="flex-grow">
        <div className="bg-stone-950 px-7 pt-5 pb-4">
          <h3 className="mb-3 text-2xl font-semibold text-stone-500">
            Cabin {name}
          </h3>

          <div className="mb-2 flex items-center gap-3">
            <UsersIcon className="h-5 w-5 text-stone-600" />
            <p className="text-lg text-stone-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex items-baseline justify-end gap-3">
            {discount > 0 ? (
              <>
                <span className="text-3xl font-[350]">
                  ${regularPrice - discount}
                </span>
                <span className="font-semibold text-stone-600 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">${regularPrice}</span>
            )}
            <span className="text-stone-200">/ night</span>
          </p>
        </div>

        <div className="border-t border-t-stone-800 bg-stone-950 text-right">
          <Link
            href={`/cabins/${id}`}
            className="inline-block border-l border-stone-800 px-6 py-4 transition-all hover:bg-stone-600 hover:text-stone-900"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
