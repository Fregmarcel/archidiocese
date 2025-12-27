'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, AlertCircle, Loader2, Mail } from 'lucide-react';

export default function ConfirmNewsletterPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const token = searchParams.get('token');
  const locale = (params?.locale as string) || 'fr';

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage(locale === 'fr' 
        ? 'Token de confirmation manquant' 
        : 'Confirmation token missing');
      return;
    }

    async function confirmSubscription() {
      try {
        const response = await fetch(`/api/newsletter/confirm?token=${token}`);
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
          ? 'Erreur lors de la confirmation' 
          : 'Error during confirmation');
      }
    }

    confirmSubscription();
  }, [token, locale]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {status === 'loading' && (
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-[#BE2722] animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {locale === 'fr' ? 'Confirmation en cours...' : 'Confirming...'}
            </h1>
            <p className="text-gray-600">
              {locale === 'fr' 
                ? 'Veuillez patienter pendant que nous confirmons votre inscription.' 
                : 'Please wait while we confirm your subscription.'}
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {locale === 'fr' ? '🎉 Inscription confirmée !' : '🎉 Subscription Confirmed!'}
            </h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-800 text-left">
                  {locale === 'fr'
                    ? "Vous recevrez désormais nos actualités directement dans votre boîte mail. Merci de votre confiance !"
                    : "You will now receive our news directly in your inbox. Thank you for your trust!"}
                </p>
              </div>
            </div>
            <Link
              href={`/${locale}`}
              className="inline-block px-6 py-3 bg-[#BE2722] text-white font-semibold rounded-lg hover:bg-[#a02020] transition-colors"
            >
              {locale === 'fr' ? 'Retour à l\'accueil' : 'Back to Home'}
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {locale === 'fr' ? 'Erreur de confirmation' : 'Confirmation Error'}
            </h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="flex flex-col gap-3">
              <Link
                href={`/${locale}/newsletter`}
                className="inline-block px-6 py-3 bg-[#BE2722] text-white font-semibold rounded-lg hover:bg-[#a02020] transition-colors"
              >
                {locale === 'fr' ? 'Réessayer l\'inscription' : 'Try Again'}
              </Link>
              <Link
                href={`/${locale}`}
                className="inline-block px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                {locale === 'fr' ? 'Retour à l\'accueil' : 'Back to Home'}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
