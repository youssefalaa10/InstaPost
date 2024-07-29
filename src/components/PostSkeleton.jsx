import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PostSkeleton = () => {
  return (
    <div className=" rounded-lg  bg-white ">
      <div className="flex items-center ">
        <Skeleton circle={true} height={40} width={40} className="mr-2" />
        <div className="flex flex-col">
          <Skeleton width={100} height={20} />
          <Skeleton width={150} height={15} />
        </div>
      </div>
      <Skeleton width={80} height={20} className="mb-2" />
      <Skeleton count={2} height={15} className="mb-4" />
      <Skeleton height={240} className="mb-4" />
      <div className="flex items-center justify-between">
        <Skeleton width={40} height={20} />
        <Skeleton width={40} height={20} />
      </div>
      <Skeleton width={100} height={20} className="mt-3" />
    </div>
  );
};

export default PostSkeleton;
