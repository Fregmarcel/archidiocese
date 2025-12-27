'use client';

import { useState } from 'react';
import { Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface SendNewsletterProps {
  newsId: string;
  newsTitle: string;
  newsExcerpt: string;
  newsSlug: string;
  newsImage?: string;
}

export default function SendNewsletterButton({
  newsId,
  newsTitle,
  newsExcerpt,
  newsSlug,
  newsImage
}: SendNewsletterProps) {
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    stats?: { sent: number; failed: number; total: number };
  } | null>(null);

  const handleSendNewsletter = async () => {
    if (!confirm(`Êtes-vous sûr de vouloir envoyer cette actualité à tous les abonnés de la newsletter ?\n\n"${newsTitle}"`)) {
      return;
    }

    setSending(true);
    setResult(null);

    try {
      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newsTitle,
          newsExcerpt,
          newsSlug,
          newsImage
        }),
      });

      const data = await response.json();
      setResult(data);

      if (data.success) {
        setTimeout(() => setResult(null), 10000); // Masquer après 10s
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'Erreur lors de l\'envoi de la newsletter'
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleSendNewsletter}
        disabled={sending}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {sending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Mail className="w-4 h-4" />
            Envoyer la newsletter
          </>
        )}
      </button>

      {result && (
        <div className={`p-4 rounded-lg flex items-start gap-3 ${
          result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          {result.success ? (
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <p className={`font-medium ${result.success ? 'text-green-800' : 'text-red-800'}`}>
              {result.message}
            </p>
            {result.stats && (
              <p className="text-sm text-gray-600 mt-1">
                Envoyés: {result.stats.sent} / Total: {result.stats.total}
                {result.stats.failed > 0 && ` (${result.stats.failed} échecs)`}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
