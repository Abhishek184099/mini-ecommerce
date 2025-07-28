const API_BASE_URL = 'https://api.freeapi.app/api/v1/public';



async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
  try {
   const res = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!res.ok) {
      const errorText = await res.text(); 
      console.error(`API Error ${res.status}: ${res.statusText}`);
      console.error(`Response body:`, errorText);
      return null;
    }

    return  await res.json(); 
  } catch (error) {
    console.error('Network or parsing error:', error);
    return null;
  }
}

export function fetchProducts() {
  return request('/randomproducts');
}

export function fetchProductById(productId: number) {
  return request(`/randomproducts/${productId}`);
}

// export function createOrder(orderData: any) {
//   return request('/orders', {
//     method: 'POST',
//     headers: { 
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(orderData),
//   });
// }

export function fetchOrders() {
  return request('/orders');
}
