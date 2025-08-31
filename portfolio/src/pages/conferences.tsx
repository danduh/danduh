import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import eventsData from "../data/events.json";

interface Event {
  id: number;
  name: string;
  eventStartDate: string;
  eventEndDate: string;
  location: string | null;
  website: string;
}

interface SpeakingEngagement {
  date: string;
  title: string;
  event: string;
  location: string;
  website?: string;
  watchRecording?: string;
  viewSlides?: string;
  recordingUnavailable?: boolean;
}

function formatEventDate(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start.toDateString() === end.toDateString()) {
    // Single day event
    return start.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } else {
    // Multi-day event
    const startFormatted = start.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
    const endFormatted = end.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return `${startFormatted} - ${endFormatted}`;
  }
}

function transformEventsToSpeakingData(): {
  [year: string]: SpeakingEngagement[];
} {
  const events = eventsData as Event[];
  const grouped: { [year: string]: SpeakingEngagement[] } = {};

  events.forEach((event) => {
    const year = new Date(event.eventStartDate).getFullYear().toString();
    const speaking: SpeakingEngagement = {
      date: formatEventDate(event.eventStartDate, event.eventEndDate),
      title: `Speaking at ${event.name}`,
      event: event.name,
      location: event.location || "Virtual Event",
      website: event.website,
    };

    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(speaking);
  });

  // Sort years in descending order and events within each year by date descending
  const sortedGrouped: { [year: string]: SpeakingEngagement[] } = {};

  Object.keys(grouped).forEach((year) => {
    sortedGrouped[year] = grouped[year].sort((a, b) => {
      const dateA = new Date(
        eventsData.find((e) => e.name === a.event)?.eventStartDate || ""
      );
      const dateB = new Date(
        eventsData.find((e) => e.name === b.event)?.eventStartDate || ""
      );
      return dateB.getTime() - dateA.getTime();
    });
  });

  return grouped;
}

const speakingData = transformEventsToSpeakingData();

function SpeakingItem({
  engagement,
}: {
  engagement: SpeakingEngagement;
}): ReactNode {
  return (
    <div className="speaking-item">
      <div className="speaking-date">{engagement.date}</div>
      <div className="speaking-content">
        <h3 className="speaking-title">{engagement.title}</h3>
        <p className="speaking-event">{engagement.event}</p>
        <p className="speaking-location">{engagement.location}</p>
        <div className="speaking-actions">
          {engagement.website && (
            <a
              href={engagement.website}
              target="_blank"
              rel="noopener noreferrer"
              className="speaking-link"
            >
              <span className="speaking-link-icon">🌐</span>
              View Event
            </a>
          )}
          {engagement.watchRecording && (
            <a
              href={engagement.watchRecording}
              target="_blank"
              rel="noopener noreferrer"
              className="speaking-link"
            >
              <span className="speaking-link-icon">▶</span>
              Watch Recording
            </a>
          )}
          {engagement.viewSlides && (
            <a
              href={engagement.viewSlides}
              target="_blank"
              rel="noopener noreferrer"
              className="speaking-link"
            >
              <span className="speaking-link-icon">📄</span>
              View Slides
            </a>
          )}
          {engagement.recordingUnavailable && (
            <span className="speaking-link speaking-link-disabled">
              <span className="speaking-link-icon">⏹</span>
              Recording Unavailable
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Conferences(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title="Speaking Engagements"
      description="A collection of my talks on UI, AI, and the future Web Development."
    >
      <main className="portfolio-hero">
        <div className="speaking-container">
          <div className="speaking-header">
            <h1>Speaking Engagements</h1>
            <p>A collection of my talks on UI, AI, and the future Web Development.</p>
          </div>

          <div className="speaking-timeline">
            {Object.entries(speakingData)
              .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
              .map(([year, engagements]) => (
                <div key={year} className="speaking-year-section">
                  <h2 className="speaking-year">{year}</h2>
                  <div className="speaking-year-content">
                    {engagements.map((engagement, index) => (
                      <SpeakingItem key={index} engagement={engagement} />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
