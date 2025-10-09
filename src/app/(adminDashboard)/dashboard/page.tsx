import StatContainer from "./_components/stats/StatContainer";
import UserOverViewChart from "./_components/userOverViewChart/UserOverViewChart";
import RecentAccountList from "./_components/recentAccountList/RecentAccountList";

const DashboardPage = () => {
  return (
    <div className="lg:space-y-7 space-y-5 ">
      <StatContainer></StatContainer>

      <UserOverViewChart></UserOverViewChart>

      <RecentAccountList></RecentAccountList>
    </div>
  );
};

export default DashboardPage;
