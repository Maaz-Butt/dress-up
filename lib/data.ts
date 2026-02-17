export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: "men" | "women";
}

export const products: Product[] = [
    {
        id: "1",
        name: "Classic White T-Shirt",
        price: 29.99,
        image: "/Classic White T-Shirt.webp",
        category: "men",
    },
    {
        id: "2",
        name: "Denim Jacket",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        category: "men",
    },
    {
        id: "3",
        name: "Summer Floral Dress",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=746&q=80",
        category: "women",
    },
    {
        id: "4",
        name: "Leather Boots",
        price: 120.0,
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        category: "men",
    },
    {
        id: "5",
        name: "Elegant Evening Gown",
        price: 150.0,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=783&q=80",
        category: "women",
    },
    {
        id: "6",
        name: "Casual Chinos",
        price: 45.0,
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        category: "men",
    },
    {
        id: "7",
        name: "Silk Blouse",
        price: 75.0,
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1372&q=80",
        category: "women",
    },
];
