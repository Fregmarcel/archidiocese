'use client';

import { useState } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, AlertCircle, Loader2, Mail } from 'lucide-react';

export default function UnsubscribeNewsletterPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const initialEmail = searchParams.get('email') || '';
  const locale = (params?.locale as string) || 'fr';

  const [email, setEmail] = useState(initialEmail);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage(locale === 'fr' ? 'Veuillez entrer votre adresse email' : 'Please enter your email');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message);
      } else {
        setStatus('error');
        setMessage(data.message);
      }
    } catch (error) {
      setStatus('error');
      setMessage(locale === 'fr' 
        ? 'Erreur lors de la désinscription' 
        : 'Error during unsubscription');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {status === 'success' ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {locale === 'fr' ? 'Désinscription réussie' : 'Successfully Unsubscribed'}
            </h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-500 mb-6">
              {locale === 'fr'
                ? 'Vous ne recevrez plus d\'emails de notre part. Vous pouvez vous réinscrire à tout moment.'
                : 'You will no longer receive emails from us. You can resubscribe at any time.'}
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href={`/${locale}/newsletter`}
                className="inline-block px-6 py-3 bg-[#2E9B51] text-white font-semibold rounded-lg hover:bg-[#267d3f] transition-colors"
              >
                {locale === 'fr' ? 'Se réinscrire' : 'Resubscribe'}
              </Link>
              <Link
                href={`/${locale}`}
                className="inline-block px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                {locale === 'fr' ? 'Retour à l\'accueil' : 'Back to Home'}
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-10 h-10 text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              {locale === 'fr' ? 'Se désabonner de la newsletter' : 'Unsubscribe from Newsletter'}
            </h1>
            <p className="text-gray-600 mb-6 text-center">
              {locale === 'fr'
                ? 'Nous sommes désolés de vous voir partir. Entrez votre email pour vous désabonner.'
                : 'We\'re sorry to see you go. Enter your email to unsubscribe.'}
            </p>

            <form onSubmit={handleUnsubscribe} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {locale === 'fr' ? 'Adresse email' : 'Email address'}
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={locale === 'fr' ? 'votre@email.com' : 'your@email.com'}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BE2722] focus:border-transparent outline-none"
                />
              </div>

              {message && (status === 'error' || status === 'idle') && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-6 py-3 bg-[#BE2722] text-white font-semibold rounded-lg hover:bg-[#a02020] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {locale === 'fr' ? 'Désinscription...' : 'Unsubscribing...'}
                  </>
                ) : (
                  locale === 'fr' ? 'Se désabonner' : 'Unsubscribe'
                )}
              </button>

              <Link
                href={`/${locale}`}
                className="block text-center text-gray-600 hover:text-gray-900 text-sm"
              >
                {locale === 'fr' ? 'Retour à l\'accueil' : 'Back to Home'}
              </Link>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
