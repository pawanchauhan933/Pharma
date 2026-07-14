import StatCard from "../../../shared/components/Card/StatCard";

const DashboardPage = () => {
  return (
    <>
      <div className="grid grid-cols-4 gap-5">
        <StatCard title="Medicines" value={1250} />
        <StatCard title="Low Stock" value={18} />
        <StatCard title="Expired" value={3} />
        <StatCard title="Today's Sales" value="₹12,450" />
      </div>
    </>
  );
};

export default DashboardPage;