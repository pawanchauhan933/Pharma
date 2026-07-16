import { Link } from "react-router-dom";

import { Button, PageHeader } from "../../../shared/ui";
import { ROUTES } from "../../../shared/constants/routes";

const ManufacturerPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Manufacturers"
        description="Manage manufacturers."
      />

      <div className="flex justify-end">
        <Link to={ROUTES.ADD_MANUFACTURER}>
          <Button>Add Manufacturer</Button>
        </Link>
      </div>

      <p>No manufacturers found.</p>
    </div>
  );
};

export default ManufacturerPage;