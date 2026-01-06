import { ManagementPageLoading } from "@/components/shared/ManagementPageLoader";

const TouristsManagementLoading = () => {
  return (
    <ManagementPageLoading
      columns={10}
      hasActionButton
      filterCount={7}
      filterWidths={["w-48", "w-32", "w-40", "w-24", "w-36"]}
    />
  );
};

export default TouristsManagementLoading;
