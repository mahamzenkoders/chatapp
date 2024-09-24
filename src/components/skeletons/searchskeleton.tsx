import { SearchIcon } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

export function SkeletonSearch() {
  return (
    <div className=''>
      <Skeleton className='bg-gray-800 h-9 p-3 w-full border border-gray-200 flex justify-between items-center'>
        <Skeleton className='w-24 h-5 bg-slate-700'></Skeleton>
        <Skeleton className=''>
          <SearchIcon />
        </Skeleton>
      </Skeleton>
    </div>
  );
}
