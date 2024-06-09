import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import { MovieInformation } from '@/types/moviesInformations';

const Banner = ({
  moviesInformations,
}: {
  moviesInformations: MovieInformation[];
}) => {
  return (
    <div className='mx-auto max-w-7xl pt-32 sm:px-6 lg:px-8'>
      <div className='w-full mb-2 p-1 flex justify-center items-center'>
        <Carousel className='w-full py-4'>
          <CarouselContent>
            {moviesInformations?.map((banner, index) => {
              const imageUrl = `https://image.tmdb.org/t/p/w1280/${banner.backdrop_path}`;

              return (
                <CarouselItem key={index}>
                  <div className='p-2 flex justify-center items-center relative'>
                    <div className='rounded-xl overflow-hidden w-full'>
                      <Image
                        src={imageUrl}
                        alt={banner.original_title}
                        objectFit='cover'
                        width={1280}
                        height={720}
                      />
                    </div>
                    <h2 className='absolute bottom-4 left-4 text-white text-2xl'>
                      {banner.original_title}
                    </h2>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
