import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

async function CabinList({ filter }) {
  const cabins = await getCabins();

  if (!cabins.length) return null;
  let displayedCabins;

  if (filter === "all") displayedCabins = cabins;
  if (filter === "1")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity === 1);
  if (filter === "2")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity === 2);
  if (filter === "3")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity === 3);
  if (filter === "4")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity === 4);

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
