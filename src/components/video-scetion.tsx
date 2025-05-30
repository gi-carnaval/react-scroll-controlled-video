import { useEffect, useRef, useState } from "react";
import "../App.css";

interface Segment {
  id: string;
  scrollStart: number;
  scrollEnd: number;
}

const segments: Segment[] = [
  { id: "video-1", scrollStart: 0.0, scrollEnd: 0.15 },
  { id: "video-2", scrollStart: 0.15, scrollEnd: 0.30 },
  { id: "video-3", scrollStart: 0.30, scrollEnd: 0.45 },
  { id: "video-4", scrollStart: 0.45, scrollEnd: 0.60 },
  { id: "video-5", scrollStart: 0.60, scrollEnd: 0.75 },
];

export default function VideoSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const [visibleVideo, setVisibleVideo] = useState<string>(segments[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const scrollY = window.scrollY - container.offsetTop;
      const totalScroll = container.offsetHeight - window.innerHeight;
      const scrollProgress = scrollY / totalScroll;

      const lastSegment = segments[segments.length - 1];
      const isAfterLast = scrollProgress >= lastSegment.scrollEnd;
      console.log("scrollProgress: ", scrollProgress)
      const activeSegment = isAfterLast
        ? lastSegment
        : segments.find(
          (seg) => scrollProgress >= seg.scrollStart && scrollProgress < seg.scrollEnd
        );

      if (!activeSegment) return;

      const activeVideo = videoRefs.current[activeSegment.id];
      if (!activeVideo) return;

      if (activeSegment.id !== visibleVideo) {
        console.log("Mudou para o segmento de vídeo: ", activeSegment.id)
        setVisibleVideo(activeSegment.id);
      }

      let segmentProgress = 0;

      if (isAfterLast) {
        segmentProgress = 1;
      } else {
        segmentProgress =
          (scrollProgress - activeSegment.scrollStart) /
          (activeSegment.scrollEnd - activeSegment.scrollStart);
      }

      if (activeVideo.duration > 0) {
        activeVideo.currentTime = activeVideo.duration * segmentProgress;
      }
    };

    const onScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [visibleVideo]);

  return (
    <div
      ref={containerRef}

      style={{
        height: `${segments.length * 80}vh`,
        background: "#fff",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {
          segments.map((segment) => (
            <div
              className="style__video-scene___1EaKs"
              style={{
                height: "754px",
                opacity: visibleVideo === segment.id ? 1 : 0,
              }}
              key={segment.id}
            >
              <video
                playsInline
                aria-hidden="true"
                className="style__video___2TB6g"
                id="video-scroller-0"

                ref={(el) => { videoRefs.current[segment.id] = el }}
                poster={`/${segment.id}.png`}
                src={`/${segment.id}.mp4`}
                muted
                style={{
                  width: "100%",
                  height: "100%",
                  maxWidth: "100%",
                  objectFit: "cover",
                  opacity: 1
                }}
              />
            </div >
          ))}
      </div>
    </div >
  );
}
