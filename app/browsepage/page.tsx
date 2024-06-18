import BrowseItemBtn from "../buttoncomponents/browseItemBtn";
import BrowseBidBtn from "../buttoncomponents/browseBidBtn";
import BrowseOpCoBtn from "../buttoncomponents/browseOpCoBtn";

export default function browsePage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center font-[sans-serif] text-[#333] h-screen">
        <BrowseItemBtn/>
      </div>
    </>
  );
}
