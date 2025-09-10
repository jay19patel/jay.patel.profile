import React from 'react';
import Image from 'next/image';

function PersonCard({ 
  imageSrc = '/jay-patel.jpg', 
  name = 'Jay Patel', 
  title = 'Software Developer',
  subtitle = 'Full Stack Developer & Content Creator'
}) {
  return (
    <div className='w-full max-w-[400px] relative mt-4 h-[430px] group mx-auto dark:bg-gray-900/50 bg-white/80 backdrop-blur-sm dark:border-gray-700 border border-gray-200 rounded-lg dark:text-white text-black flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300'>
      <div className='w-full rounded-t-lg h-[350px] group-hover:h-[410px] overflow-hidden transition-all duration-300'>
        <Image
          src={imageSrc}
          alt={name}
          width={600}
          height={600}
          className='h-full w-full scale-105 group-hover:scale-100 grayscale group-hover:grayscale-0 object-cover transition-all duration-300'
        />
      </div>
      <article className='relative overflow-hidden flex-grow'>
        <div className='info p-4 translate-y-0 group-hover:-translate-y-20 transition-all duration-300'>
          <p className='text-xl md:text-2xl font-bold text-gray-900 dark:text-white'>{name}</p>
          <p className='text-sm sm:text-base text-gray-600 dark:text-gray-300'>{title}</p>
        </div>
        <div className='absolute h-12 -bottom-12 opacity-0 group-hover:opacity-100 group-hover:bottom-3 transition-all duration-300 w-full px-4'>
          <div className='text-center'>
            <p className='text-sm font-medium text-blue-600 dark:text-blue-400'>{subtitle}</p>
            <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>Hover to explore</p>
          </div>
        </div>
      </article>
    </div>
  );
}

export default PersonCard;