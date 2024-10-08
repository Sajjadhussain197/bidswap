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
import { getData } from "@/lib/getData";

import { CircleCheck, ListCheckIcon, Package, ShoppingCart,CircleEllipsis } from 'lucide-react';
import Products from "./(catalog)/products/page";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if(role==="USER"){
    return <UserDashboard/>
  }
  if(role==="SELLER"){
    return <SellerDashboard/>
  }
  const orders = await getData("orders");
  let todayTotal = 0;
  let yesterdayTotal = 0;
  let monthlyTotal = 0;
  let overallTotal = 0;
  let totalOrders = 0;
  let ordersPending = 0;
  let ordersProcessing = 0;
  let ordersDelivered = 0;

  orders.forEach(order => {
    if (!order.sales || order.sales.length === 0) return; // Skip if there are no sales or if the sales array is empty
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const orderDate = new Date(order.createdAt);

    if (orderDate.toDateString() === today.toDateString()) {
      todayTotal += order.sales[0].total;
    } else if (orderDate.toDateString() === yesterday.toDateString()) {
      yesterdayTotal += order.sales[0].total;
    } else if (orderDate >= monthStart) {
      monthlyTotal += order.sales[0].total;
    }
    overallTotal += order.sales[0].total;

    switch (order.orderStatus) {
      case 'PENDING':
        ordersPending++;
        break;
      case 'PROCESSING':
        ordersProcessing++;
        break;
      case 'DELIVERED':
        ordersDelivered++;
        break;
      default:
        break;
    }
    totalOrders++;
  });
  const largeCardData = [
    { period: 'Todays Orders', sales: todayTotal, color: 'bg-green-600' },
    { period: 'Yesterday Orders', sales: yesterdayTotal, color: 'bg-blue-600' },
    { period: 'This Month', sales: monthlyTotal, color: 'bg-orange-600' },
    { period: 'All-time Sales', sales: overallTotal, color: 'bg-purple-600' }
  ];


  const smallCardData = [
    { title: 'Total Orders', number: totalOrders, iconColour: 'bg-green-600', icon: ShoppingCart },
    { title: 'Orders Pending', number: ordersPending, iconColour: 'bg-blue-600', icon: CircleEllipsis },
    { title: 'Orders Processing', number: ordersProcessing, iconColour: 'bg-orange-600', icon: Package },
    { title: 'Orders Delivered', number: ordersDelivered, iconColour: 'bg-purple-600', icon: CircleCheck }
  ];
  return (
    <div>
    <Heading title="Dashboard Overview"/>
    {/* Large Cards */}
 
    <LargeCards data={largeCardData} />
    {/* Small Cards */}
    <SmallCards data={smallCardData}/>
    {/* Charts */}
    <DashBoardCharts/>
    {/* Recent Orders Table */}
    {/* <CustomDataTable/> */}
    <Products />
    </div>
  );
}
