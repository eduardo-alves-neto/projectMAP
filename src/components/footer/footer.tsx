import Link from 'next/link';
import { contactLinks, socialLinks, footerLinks } from './values';

export default function Footer() {
  return (
    <footer className='w-full mt-16 sm:mt-24 sm:grid sm:grid-cols-2 md:grid-cols-5 border-t border-gray-200 mx-auto max-w-7xl px-0 sm:px-6 lg:px-6'>
      <div className='px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
          {contactLinks.map((link, index) => (
            <div key={index}>
              <p>
                <span className='text-xs uppercase tracking-wide text-gray-500'>
                  Ligue
                </span>
                <Link href={link.href} className={link.classes}>
                  {link.label}
                </Link>
              </p>
            </div>
          ))}

          <ul className='mt-8 flex gap-6'>
            {socialLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  rel='noreferrer'
                  target='_blank'
                  className='text-gray-700 transition hover:opacity-75'
                >
                  <span className='sr-only'>{link.srLabel}</span>
                  <svg
                    className='h-6 w-6'
                    fill='currentColor'
                    viewBox={link.svgViewBox}
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d={link.svgPath}
                      clipRule='evenodd'
                    />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='mt-12 border-t border-gray-100 pt-12'>
          <div className='sm:flex sm:items-center sm:justify-between'>
            <ul className='flex flex-wrap gap-4 text-xs'>
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className='text-gray-500 transition hover:opacity-75'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className='mt-8 text-xs text-gray-500 sm:mt-0'>
              &copy; 2022. TMDB FILMES. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
