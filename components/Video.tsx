import { useWidth } from "@/lib/hooks/useWidth";

const Video = () => {
  const width = useWidth();
  const isMd = width >= 768;
  return isMd ? (
    <video
      playsInline
      loop
      autoPlay
      muted
      src={"static/home/main_video.mp4"}
      className="absolute left-0 hidden w-full h-content md:block top-14"
    />
  ) : (
    <video
      playsInline
      loop
      autoPlay
      muted
      src={"static/home/main_video_responsive.mp4"}
      className="fixed top-0 w-full h-screen md:hidden"
    />
  );
};

export default Video;
