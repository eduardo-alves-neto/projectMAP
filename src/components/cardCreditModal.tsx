import { useState } from 'react';

interface CreditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function CreditCardModal({
  isOpen,
  onClose,
}: CreditCardModalProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');

  const handleSubmit = () => {
    //implementar
  };

  return (
    isOpen && (
      <div
        className='modal'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <div
          className='modal-content'
          style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '4px',
            width: '80%',
            maxWidth: '500px',
          }}
        >
          <span
            className='close'
            onClick={onClose}
            onKeyDown={onClose}
            role='button'
            tabIndex={0}
          >
            &times;
          </span>
          <form
            onSubmit={handleSubmit}
            className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
          >
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                Número do cartão:
                <input
                  type='text'
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </label>
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                Data de validade:
                <input
                  type='text'
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </label>
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                CVV:
                <input
                  type='text'
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </label>
            </div>
            <div className='mb-6'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                Nome do titular do cartão:
                <input
                  type='text'
                  value={cardHolderName}
                  onChange={(e) => setCardHolderName(e.target.value)}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </label>
            </div>
            <div className='flex items-center justify-between'>
              <input
                type='submit'
                value='Confirmar pagamento'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              />
            </div>
          </form>
        </div>
      </div>
    )
  );
}
