import { getData } from "@/lib/getData";
import CategoryList from "../components/frontend/CategoryList";
import CommunityTrainings from "../components/frontend/CommunityTrainings";
import Hero from "../components/frontend/Hero";
import MarketList from "../components/frontend/MarketList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";



export default async function Home() {
  const categories = await getData("categories");
  const session = await getServerSession(authOptions);
  console.log(session?.user)
  return (
    <div className="min-h-screen">
      <Hero/>
      <MarketList/>
      {
        categories.map((category,i)=>{
          return(
            <div key={i} className="py-8">
              <CategoryList category={category}/>
            </div>
          )
        })
      }
   
     <CommunityTrainings/>
      
    
      <h2 className="text-4xl">Welcome to BidSwap360</h2>
      
      
    </div>
   
  );
}
