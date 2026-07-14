import { Link } from "react-router-dom";
import { Button, PageHeader } from "../../../shared/ui";
import { ROUTES } from "../../../shared/constants/routes";

const MedicinePage = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Medicines"
        description="Manage medicines in your inventory."
      />

      <div className="flex justify-end">
        <Link to={ROUTES.ADD_MEDICINE}>
          <Button>Add Medicine</Button>
        </Link>
      </div>

      <p>No medicines found.</p>
    </div>
  );
};

export default MedicinePage;