import SearchFilters from "./filter";
import OrderTable from "./order-table";

export const Orders = () => {
  return (
    <div>
      <div className="mb-6">
        <SearchFilters onSearch={(ev) => console.log(ev)} />
      </div>

      <div className="bg-white rounded-lg shadow">
        <OrderTable />
      </div>
    </div>
  );
};
