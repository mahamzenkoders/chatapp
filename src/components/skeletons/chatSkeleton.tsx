import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonChat() {
  return (
    <div className='mt-3 space-y-1'>
      <Skeleton className='bg-gray-800 text-white p-3 rounded w-full border flex items-center gap-2 border-gray-300'>
        <Skeleton className='rounded-full h-12 w-12 bg-gray-700'></Skeleton>
        <Skeleton className='w-24 h-5 bg-slate-700'></Skeleton>
      </Skeleton>
    </div>
  );
}
