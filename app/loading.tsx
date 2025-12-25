import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return( <div className="flex items-center justify-center min-h-screen  from-green-100 via-green-200 to-green-300">
  <div className="text-center">
    <Spinner/>
    <p className="mt-4 text-lg md:text-2xl font-semibold animate-pulse">Loading, please wait...</p>
    </div>
    </div> )
}
