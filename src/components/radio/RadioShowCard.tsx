import { Play, Clock } from 'lucide-react';
import Image from 'next/image';

interface RadioShowCardProps {
  title: string;
  description: string;
  duration: string;
  imageUrl?: string;
  host: string;
  date: Date;
  onPlay: () => void;
}

export default function RadioShowCard({
  title,
  description,
  duration,
  imageUrl,
  host,
  date,
  onPlay
}: RadioShowCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(date));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image header */}
      <div className="relative h-48 bg-gray-200">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-100 to-purple-100">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-white" />
            </div>
          </div>
        )}
        
        {/* Duration overlay */}
        <div className="absolute top-3 right-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Animé par: {host}</span>
            <span>{formatDate(date)}</span>
          </div>
        </div>

        {/* Play button */}
        <button
          onClick={onPlay}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4" />
          Écouter
        </button>
      </div>
    </div>
  );
}
