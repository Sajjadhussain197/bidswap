import Image from "next/image";
import Heading from "../../components/backend/Heading";
import LargeCards from "../../components/backend/LargeCards";
import SmallCards from "../../components/backend/SmallCards";
import DashBoardCharts from "../../components/backend/DashBoardCharts";
import CustomDataTable from "../../components/backend/CustomDataTable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import UserDashboard from "@/app/components/backend/UserDashboard";
import SellerDashboard from "@/app/components/backend/SellerDashboard";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if(role==="USER"){
    return <UserDashboard/>
  }
  if(role==="SELLER"){
    return <SellerDashboard/>
  }
  return (
    <div>
    <Heading title="Dashboard Overview"/>
    {/* Large Cards */}
    <LargeCards/>
    {/* Small Cards */}
    <SmallCards/>
    {/* Charts */}
    <DashBoardCharts/>
    {/* Recent Orders Table */}
    <CustomDataTable/>
    </div>
  );
}
