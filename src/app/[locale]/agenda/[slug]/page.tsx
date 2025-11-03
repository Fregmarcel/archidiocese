import { notFound } from 'next/navigation';

async function getEvent(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/events/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  const json = await res.json();
  return json?.data || null;
}

export default async function EventDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return notFound();

  const dateLabel = event.date ? new Date(event.date).toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' }) : '';

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="text-gray-600 mb-6">{dateLabel}{event.location ? ` — ${event.location}` : ''}</p>
      {event.image && (
        <img src={event.image} alt={event.title} className="w-full max-h-[480px] object-cover rounded-lg border mb-6" />
      )}
      {event.excerpt && (
        <div className="mb-4 p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg">{event.excerpt}</div>
      )}
      {event.content && (
        <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: event.content }} />
      )}
    </section>
  );
}
