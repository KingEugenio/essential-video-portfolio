/**
 * Google Calendar integration for the booking / enquiry flow.
 * Client-side handoff (no OAuth): a pre-filled Google Calendar event link and a
 * downloadable .ics. Auto-sync to the studio's own calendar needs OAuth + the
 * backend (a later step).
 */

export interface CalendarBooking {
  title: string;
  date?: string; // YYYY-MM-DD; defaults to a near tentative date
  details: string;
  location?: string;
  studioName?: string;
  studioEmail?: string;
  clientName?: string;
  clientEmail?: string;
}

function safeDay(date?: string): string {
  if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) return date.replace(/-/g, '');
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return d.toISOString().split('T')[0].replace(/-/g, '');
}

export function generateGoogleCalendarUrl(b: CalendarBooking): string {
  const day = safeDay(b.date);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: b.title,
    dates: `${day}T100000/${day}T110000`,
    details: b.details,
    location: b.location || 'Remote / Online',
  });
  if (b.studioEmail) params.append('add', b.studioEmail);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function generateICS(b: CalendarBooking): string {
  const day = safeDay(b.date);
  const uid = `${Date.now()}@essential-portfolio`;
  const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Essential Portfolio//Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${day}T100000`,
    `DTEND:${day}T110000`,
    `SUMMARY:${esc(b.title)}`,
    `DESCRIPTION:${esc(b.details)}`,
    `LOCATION:${esc(b.location || 'Remote / Online')}`,
    b.studioEmail ? `ORGANIZER;CN=${esc(b.studioName || 'Studio')}:mailto:${b.studioEmail}` : '',
    b.clientEmail ? `ATTENDEE;CN=${esc(b.clientName || 'Client')}:mailto:${b.clientEmail}` : '',
    'STATUS:TENTATIVE',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean).join('\r\n');
}

export function downloadICS(b: CalendarBooking): void {
  const blob = new Blob([generateICS(b)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `booking-${safeDay(b.date)}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
