export const sampleProperties = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    description: "Beautiful 2-bedroom apartment in the heart of downtown. Features include hardwood floors, stainless steel appliances, and a stunning city view.",
    price: 450000,
    location: "New York, NY",
    type: "sale",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    contact: "john.doe@example.com",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
    ],
    sellerId: "sample-user-1",
    sellerEmail: "john.doe@example.com",
    createdAt: "2024-01-15T10:30:00.000Z",
    updatedAt: "2024-01-15T10:30:00.000Z"
  },
  {
    id: "2",
    title: "Cozy Suburban House",
    description: "Charming 3-bedroom house in a quiet suburban neighborhood. Perfect for families with a large backyard and updated kitchen.",
    price: 2800,
    location: "Austin, TX",
    type: "rent",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    contact: "jane.smith@example.com",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    ],
    sellerId: "sample-user-2",
    sellerEmail: "jane.smith@example.com",
    createdAt: "2024-01-14T14:20:00.000Z",
    updatedAt: "2024-01-14T14:20:00.000Z"
  },
  {
    id: "3",
    title: "Luxury Penthouse Suite",
    description: "Stunning penthouse with panoramic city views. Features include a private terrace, marble countertops, and premium finishes.",
    price: 1200000,
    location: "San Francisco, CA",
    type: "sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    contact: "mike.johnson@example.com",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80"
    ],
    sellerId: "sample-user-3",
    sellerEmail: "mike.johnson@example.com",
    createdAt: "2024-01-13T09:15:00.000Z",
    updatedAt: "2024-01-13T09:15:00.000Z"
  }
];

export const initializeSampleData = () => {
  const existingProperties = localStorage.getItem('properties');
  if (!existingProperties || JSON.parse(existingProperties).length === 0) {
    localStorage.setItem('properties', JSON.stringify(sampleProperties));
  }
};