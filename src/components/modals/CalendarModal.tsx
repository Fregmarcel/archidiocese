"use client";

import { useEffect, useState } from 'react';
import { X, Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  date: Date;
  location?: string;
  excerpt?: string;
  slug?: string;
  href?: string;
}

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: EventItem[];
  locale: string;
}

export default function CalendarModal({ isOpen, onClose, events, locale }: CalendarModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [hoveredEvent, setHoveredEvent] = useState<{ events: EventItem[]; x: number; y: number } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      const t = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) { window.addEventListener('keydown', handleEscape); return () => window.removeEventListener('keydown', handleEscape); }
  }, [isOpen, onClose]);

  if (!isVisible) return null;

  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
  const startDay = firstDay === 0 ? 6 : firstDay - 1;

  const getEventsForDay = (day: number) => {
    return events.filter(ev => {
      const evDate = new Date(ev.date);
      return evDate.getDate() === day && evDate.getMonth() === selectedMonth && evDate.getFullYear() === selectedYear;
    });
  };

  const handlePrevMonth = () => {
    if (selectedMonth === 0) { setSelectedMonth(11); setSelectedYear(selectedYear - 1); }
    else setSelectedMonth(selectedMonth - 1);
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) { setSelectedMonth(0); setSelectedYear(selectedYear + 1); }
    else setSelectedMonth(selectedMonth + 1);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div onClick={(e) => e.stopPropagation()} className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-6">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all group" aria-label="Fermer">
            <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>
          <div className="flex items-center gap-3 text-white">
            <CalendarIcon className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">Calendrier des Évènements</h2>
              <p className="text-indigo-100 text-sm mt-1">{events.length} évènement{events.length > 1 ? 's' : ''} à venir</p>
            </div>
          </div>
        </div>

        {/* Calendar Controls */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <button onClick={handlePrevMonth} className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition-colors text-gray-700 font-semibold">
            ← Précédent
          </button>
          <h3 className="text-xl font-bold text-gray-900">{months[selectedMonth]} {selectedYear}</h3>
          <button onClick={handleNextMonth} className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition-colors text-gray-700 font-semibold">
            Suivant →
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
              <div key={day} className="text-center text-xs font-bold text-gray-600 uppercase py-2">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: startDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = getEventsForDay(day);
              const hasEvents = dayEvents.length > 0;
              const isToday = day === new Date().getDate() && selectedMonth === new Date().getMonth() && selectedYear === new Date().getFullYear();

              return (
                <div
                  key={day}
                  className={`aspect-square relative rounded-lg transition-all duration-200 ${
                    hasEvents 
                      ? 'bg-gradient-to-br from-[#BE2722] to-[#d63a34] border-2 border-[#BE2722] shadow-md hover:shadow-xl hover:scale-110 cursor-pointer' 
                      : isToday 
                        ? 'border-2 border-indigo-600 bg-indigo-50' 
                        : 'border-2 border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onMouseEnter={(e) => {
                    if (hasEvents) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoveredEvent({ events: dayEvents, x: rect.left + rect.width / 2, y: rect.top });
                    }
                  }}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  <div className="p-2 h-full flex flex-col">
                    <span className={`text-sm font-bold ${hasEvents ? 'text-white' : isToday ? 'text-indigo-600' : 'text-gray-700'}`}>
                      {day}
                    </span>
                    {hasEvents && (
                      <div className="flex-1 flex flex-col items-center justify-center gap-1">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-lg" />
                        {dayEvents.length > 1 && (
                          <div className="px-1.5 py-0.5 bg-white/20 backdrop-blur-sm rounded-full">
                            <span className="text-[10px] text-white font-extrabold">{dayEvents.length} événements</span>
                          </div>
                        )}
                        {dayEvents.length === 1 && (
                          <div className="px-1.5 py-0.5 bg-white/20 backdrop-blur-sm rounded-full">
                            <span className="text-[9px] text-white font-bold">1 événement</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-[#BE2722] to-[#d63a34] rounded shadow-md" />
              <span className="text-gray-600 font-medium">Jour avec événement</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 border-2 border-indigo-600 bg-indigo-50 rounded" />
              <span className="text-gray-600 font-medium">Aujourd'hui</span>
            </div>
          </div>
        </div>

        {/* Hover Tooltip */}
        {hoveredEvent && (
          <div
            className="fixed z-[60] pointer-events-none"
            style={{
              left: `${hoveredEvent.x}px`,
              top: `${hoveredEvent.y - 10}px`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-xl shadow-2xl p-4 max-w-sm border-2 border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-start gap-3 mb-2">
                <div className="p-2 bg-[#BE2722] rounded-lg">
                  <CalendarIcon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-base leading-tight text-white">{hoveredEvent.events.length} évènement{hoveredEvent.events.length>1?'s':''} ce jour</h4>
              </div>
              <ul className="space-y-3 max-h-64 overflow-auto pr-1">
                {hoveredEvent.events.map((ev) => (
                  <li key={ev.id} className="rounded-lg p-3 bg-white/5 hover:bg-white/10 transition">
                    <p className="font-semibold text-sm leading-tight text-white mb-1">{ev.title}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-300 flex-wrap">
                      <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-indigo-400" />{new Date(ev.date).toLocaleString(locale, { dateStyle: 'medium', timeStyle: 'short' })}</span>
                      {ev.location && (<span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-green-400" />{ev.location}</span>)}
                    </div>
                    {ev.excerpt && (<p className="text-xs text-gray-400 mt-1 line-clamp-2">{ev.excerpt}</p>)}
                  </li>
                ))}
              </ul>
              {/* Arrow */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-transparent border-t-gray-900" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
