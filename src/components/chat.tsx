'use client';

import { Dispatch, SetStateAction } from 'react';
import { ArrowLeftIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

import { Input } from './ui/input';
import { Button } from './ui/button';

interface ChatProps {
  setOpenChat: Dispatch<SetStateAction<boolean>>;
}

export default function Chat({ props }: { props: ChatProps }) {
  const { setOpenChat } = props;

  return (
    <div className='fixed bg-white h-screen w-full top-0 left-0 z-[1000]'>
      <div className='bg-amaranth flex justify-between items-center py-4 px-4'>
        <button onClick={() => setOpenChat(false)} className='p'>
          <ArrowLeftIcon className='h-6 w-6 text-white' />
        </button>
        <button className='text-white'>
          <svg
            fill='#fff'
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
          >
            <path d='M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z' />
          </svg>
        </button>
      </div>

      <div className='px-2 sm:px-8 pt-12 flex items-start gap-2.5 w-full justify-end'>
        <div className='flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-300 bg-gray-200 rounded-e-xl rounded-es-xl dark:bg-gray-700'>
          <div className='flex items-center space-x-2 rtl:space-x-reverse'>
            <span className='text-sm font-semibold text-gray-900 dark:text-white'>Atendimento</span>
            <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>11:46</span>
          </div>
          <p className='text-sm font-normal py-2.5 text-gray-900 dark:text-white'>
            Olá cliente, informe seu problema ou dúvida, e retornaremos o mais breve possível.
          </p>
        </div>
        <img className='w-12 h-12 rounded-full' src='./LOGO.png' alt='Jatoba logo' />
      </div>

      <div className='w-full fixed bottom-0 sm:bottom-4 flex justify-center items-center'>
        <div className='w-full sm:w-3/6 left-0 py-4 sm:py-2 px-2 bg-gray-200 flex justify-between items-center gap-4 sm:rounded-3xl'>
          <Input
            className='w-full rounded-2xl py-6 sm:py-5 border-0 bg-white'
            type='text'
            placeholder='Digite sua mensagem...'
          />
          <Button className='bg-amaranth hover:bg-red-600 h-14 w-14 sm:h-12 sm:w-12 rounded-full'>
            <PaperAirplaneIcon className='h-12 w-12 text-white' />
          </Button>
        </div>
      </div>
    </div>
  );
}
