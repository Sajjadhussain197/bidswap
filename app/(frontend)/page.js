
import { getData } from "@/lib/getData";
import CategoryList from "../components/frontend/CategoryList";
import CommunityTrainings from "../components/frontend/CommunityTrainings";
import Hero from "../components/frontend/Hero";
import MarketList from "../components/frontend/MarketList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
function transformData(data) {
  const transformed = data.reduce((result, product) => {
    const { category, ...productDetails } = product;

    // Check if the category already exists in the result array
    let categoryIndex = result.findIndex(c => c.id === category.id);

    if (categoryIndex === -1) {
      // If category doesn't exist, add it with an empty products array
      result.push({
        ...category,
        products: [productDetails] // Add the product to the products array
      });
    } else {
      // If category exists, add the product to its products array
      result[categoryIndex].products.push(productDetails);
    }

    return result;
  }, []);

  return transformed;
}


export default async function Home({ searchParams }) {
  const categoryId = searchParams?.category;
  let categories;
  console.log(searchParams, "here is search params");
  
  const serviceType = searchParams.serviceType || ''; // Get the serviceType from searchParams
  const query = searchParams.query || ''; // Get the query from searchParams
  const minprice = searchParams.minprice || ''; // Get the minprice from searchParams
  const maxprice = searchParams.maxprice || ''; // Get the maxprice from searchParams
  
  
  if (categoryId) {
    const categoryData = await getData(`categories/${categoryId}`);
    categories = categoryData ? [categoryData] : [];
    console.log(categories)
  } else if (serviceType || query) {
    const queryParams = new URLSearchParams({ serviceType, query }).toString();
      console.log(queryParams, "slug of query")
      const categoryData = await getData(`products/product/?${queryParams}`);
      console.log(categoryData, "to find amount")
      const categoryMap = {};

      if (Array.isArray(categoryData)) {
        categoryData.forEach((product) => {
          const categoryId = product.categoryId;
      
          // Check if the category already exists in the map
          if (!categoryMap[categoryId]) {
            // Create a new category entry
            categoryMap[categoryId] = {
              id: categoryId,
              name: product.category.name,
              salePrice: product.saleprice,
              description: product.category.description,
              image: product.category.image,
              slug: product.category.slug,
              createdAt: product.category.createdAt,
              updatedAt: product.category.updatedAt,
              expiresAt: null, // Initialize with null
              serviceType: product.serviceType ? product.serviceType.name : null,
              products: [],
            };
          }
      
          // Extract expiresAt from the bids if available
          const expiresAt = Array.isArray(product.bids) && product.bids.length > 0 
            ? product.bids[0].expiresAt // Assuming first bid contains the expiration
            : null;
          const productExchange = Array.isArray(product.barters) && product.barters.length > 0 
          ? product.barters[0].prductExchange // Assuming first bid contains the expiration
          : null;
          categoryMap[categoryId].expiresAt = expiresAt;
          categoryMap[categoryId].productExchange = productExchange;
      
          // Push the product into the corresponding category's products array
          categoryMap[categoryId].products.push({
            id: product.id,
            name: product.name,
            description: product.description,
            image: product.image,
            slug: product.slug,
          });
        });
      }
      
  
      // Convert the category map to an array
      categories = Object.values(categoryMap);
      console.log(categories, "search datas");
    }
    else if(minprice || maxprice){
      
    const queryParams = new URLSearchParams({ minprice, maxprice }).toString();
    console.log(queryParams, "slug of query")
    const categoryData = await getData(`products/product/?${queryParams}`);
    console.log(categoryData,"prices")
    if(categoryData){

      categories = categoryData ? transformData(categoryData) : [];
    }
    // categories = categoryData ? [categoryData] : [];
    }
  else {
    categories = await getData("categories");
    // console.log(categories)
    if(categories){
      console.log(categories, "categories with products, simple")
    }
  }
  const session = await getServerSession(authOptions);
  console.log(session?.user);

  return (
    <div className="min-h-screen">
      <Hero />
      <MarketList />
      {categories.map((category, i) => {
        return (
          <div key={i} className="py-8">
            <CategoryList category={category} />
          </div>
        );
      })}

      <CommunityTrainings />

      <h2 className="text-4xl">Welcome to BidSwap360</h2>
    </div>
  );
}
