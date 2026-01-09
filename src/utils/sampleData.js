// Sample property data for demonstration
export const sampleProperties = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    description: "Beautiful 2-bedroom apartment in the heart of downtown. Features include hardwood floors, stainless steel appliances, and a stunning city view. Walking distance to restaurants, shopping, and public transportation.",
    price: 450000,
    location: "New York, NY",
    type: "sale",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    contact: "john.doe@example.com",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
    ],
    sellerId: "sample-user-1",
    sellerEmail: "john.doe@example.com",
    createdAt: "2024-01-15T10:30:00.000Z",
    updatedAt: "2024-01-15T10:30:00.000Z"
  },
  {
    id: "2",
    title: "Cozy Suburban House",
    description: "Charming 3-bedroom house in a quiet suburban neighborhood. Perfect for families with a large backyard, updated kitchen, and spacious living areas. Great schools nearby.",
    price: 2800,
    location: "Austin, TX",
    type: "rent",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    contact: "jane.smith@example.com",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    sellerId: "sample-user-2",
    sellerEmail: "jane.smith@example.com",
    createdAt: "2024-01-14T14:20:00.000Z",
    updatedAt: "2024-01-14T14:20:00.000Z"
  },
  {
    id: "3",
    title: "Luxury Penthouse Suite",
    description: "Stunning penthouse with panoramic city views. Features include a private terrace, marble countertops, floor-to-ceiling windows, and premium finishes throughout. Building amenities include gym, pool, and concierge.",
    price: 1200000,
    location: "San Francisco, CA",
    type: "sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    contact: "mike.johnson@example.com",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
    ],
    sellerId: "sample-user-3",
    sellerEmail: "mike.johnson@example.com",
    createdAt: "2024-01-13T09:15:00.000Z",
    updatedAt: "2024-01-13T09:15:00.000Z"
  },
  {
    id: "4",
    title: "Beachfront Condo",
    description: "Wake up to ocean views every day in this beautiful beachfront condo. Recently renovated with modern amenities while maintaining coastal charm. Direct beach access and resort-style amenities.",
    price: 3500,
    location: "Miami, FL",
    type: "rent",
    bedrooms: 2,
    bathrooms: 2,
    area: 1400,
    contact: "sarah.wilson@example.com",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    sellerId: "sample-user-4",
    sellerEmail: "sarah.wilson@example.com",
    createdAt: "2024-01-12T16:45:00.000Z",
    updatedAt: "2024-01-12T16:45:00.000Z"
  },
  {
    id: "5",
    title: "Historic Brownstone",
    description: "Beautifully restored historic brownstone with original architectural details. Features include exposed brick walls, hardwood floors, and a private garden. Located in a charming historic district.",
    price: 750000,
    location: "Boston, MA",
    type: "sale",
    bedrooms: 3,
    bathrooms: 2,
    area: 2000,
    contact: "david.brown@example.com",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    sellerId: "sample-user-5",
    sellerEmail: "david.brown@example.com",
    createdAt: "2024-01-11T11:30:00.000Z",
    updatedAt: "2024-01-11T11:30:00.000Z"
  },
  {
    id: "6",
    title: "Mountain View Cabin",
    description: "Peaceful mountain retreat with breathtaking views. Perfect for weekend getaways or year-round living. Features include a stone fireplace, wrap-around deck, and hiking trails nearby.",
    price: 1800,
    location: "Denver, CO",
    type: "rent",
    bedrooms: 2,
    bathrooms: 1,
    area: 1000,
    contact: "lisa.garcia@example.com",
    images: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    sellerId: "sample-user-6",
    sellerEmail: "lisa.garcia@example.com",
    createdAt: "2024-01-10T13:20:00.000Z",
    updatedAt: "2024-01-10T13:20:00.000Z"
  }
];

// Function to initialize sample data if localStorage is empty
export const initializeSampleData = () => {
  const existingProperties = localStorage.getItem('properties');
  if (!existingProperties || JSON.parse(existingProperties).length === 0) {
    localStorage.setItem('properties', JSON.stringify(sampleProperties));
    console.log('✅ Sample property data initialized');
  }
};