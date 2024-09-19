
import toast from "react-hot-toast";

export async function makePostRequest(
  endpoint,
  data,
  resourceName,
  reset,
  redirect
) {
  // const router = useRouter();
  try {
    // setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // setLoading(false);
      toast.success(`New ${resourceName} Created Successfully`);
      reset();
      redirect();
    } else {
      // setLoading(false);
      if (response.status === 409) {
        toast.error("The Giving Warehouse Stock is NOT Enough");
      } else {
        toast.error("Something Went wrong");
      }
    }
  } catch (error) {
    // setLoading(false);
    console.log(error);
  }
}

export async function makePutRequest(
  endpoint,
  data,
  resourceName,
  redirect,
  reset
) {
  console.log('here');
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // Fallback to localhost if environment variable is not set
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log(response);
      toast.success(`${resourceName} Updated Successfully`);
      redirect();
    } else {
      console.error('Error response:', await response.text()); // Log error response
      toast.error("Something Went wrong");
    }
  } catch (error) {
    console.log('Fetch error:', error);
  }
}