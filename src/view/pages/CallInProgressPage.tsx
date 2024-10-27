import UPSInfoContainer from "../components/call-in-progress/UPSInfoContainer";
import VideoSection from "../components/call-in-progress/VideoSection";

const CallInProgressPage: React.FC = () => {
  return (
    <>
      <VideoSection />
      <UPSInfoContainer />
    </>
  );
};

export default CallInProgressPage;
