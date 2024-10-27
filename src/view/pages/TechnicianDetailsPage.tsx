import AvailabilitySwitch from "../components/technician-details/AvailabilitySwitch";
import TechnicianRegistry from "../components/technician-details/TechnicianRegistry";

const TechnicianDetailsPage: React.FC = () => {
  return (
    <div className="d-flex flex-column justify-content-start m-5">
      <h1 className="socomec mb-5">Technician's info</h1>
      <TechnicianRegistry />
      <AvailabilitySwitch />
    </div>
  );
};

export default TechnicianDetailsPage;
