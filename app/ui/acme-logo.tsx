import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/font';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-col items-center pb-4 leading-none text-white`}
    >
      {/* <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" /> */}
      <p className="text-[44px]">glitz Bd</p>
    </div>
  );
}
