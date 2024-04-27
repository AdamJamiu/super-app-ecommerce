import product1 from "../assets/images/product-1-1.jpg"
import product2 from "../assets/images/product-1-2.jpg"
import product3 from "../assets/images/product-1-3.jpg"
import product4 from "../assets/images/product-1-4.jpg"
import product5 from "../assets/images/product-2-1.jpg"
import product6 from "../assets/images/product-2-2.jpg"
import product7 from "../assets/images/product-2-3.jpg"
import product8 from "../assets/images/product-2-4.jpg"
import product9 from "../assets/images/social-cut-aXJdmnxauwY-unsplash.jpg"

export const orders = [
    {
        id: 1,
        image: product1,
        name: 'Mango',
        orderDate: '2021-08-01',
        deliveryDate: '2021-08-05',
        status: 'CANCELLED',
        price: 100,
        orderId: 'ORD-001',
        quantity: 1,
        total: 100
    },
    {
        id: 2,
        image: product2,
        name: 'Lady Finger',
        orderDate: '2021-08-01',
        deliveryDate: '2021-08-05',
        status: 'DELIVERED',
        price: 100,
        orderId: 'ORD-002',
        quantity: 1,
        total: 100
    },
    {
        id: 3,
        image: product3,
        name: 'Apple',
        orderDate: '2021-08-01',
        deliveryDate: '2021-08-05',
        status: 'DELIVERED',
        price: 100,
        orderId: 'ORD-003',
        quantity: 1,
        total: 100
    },
    {
        id: 4,
        image: product4,
        name: 'Banana',
        orderDate: '2021-08-01',
        deliveryDate: '2021-08-05',
        status: 'DELIVERED',
        price: 100,
        orderId: 'ORD-004',
        quantity: 1,
        total: 100
    },
    {
        id: 5,
        image: product5,
        name: 'Orange',
        orderDate: '2021-08-01',
        deliveryDate: '2023-01-15',
        status: 'CANCELLED',
        price: 5000,
        orderId: 'ORD-005',
        quantity: 1,
        total: 5000
    },
    {
        id: 6,
        image: product6,
        name: 'Grapes',
        orderDate: '2021-08-01',
        deliveryDate: '2021-08-05',
        status: 'PENDING',
        price: 10000,
        orderId: 'ORD-006',
        quantity: 10,
        total: 10000
    },
    {
        id: 7,
        image: product7,
        name: 'Pineapple',
        orderDate: '2023-03-11',
        deliveryDate: '2023-03-15',
        status: 'DELIVERED',
        price: 1030,
        orderId: 'ORD-007',
        quantity: 12,
        total: 1030,
    },
    {
        id: 8,
        image: product8,
        name: 'Watermelon',
        orderDate: '2023-03-11',
        deliveryDate: '2023-03-15',
        status: 'SHIPPED',
        price: 1030,
        orderId: 'ORD-008',
        quantity: 12,
        total: 1030,
    },
    {
        id: 9,
        image: product9,
        name: 'Girl Dresss',
        orderDate: '2023-03-11',
        deliveryDate: '2023-03-15',
        status: 'SHIPPED',
        price: 1030,
        orderId: 'ORD-008',
        quantity: 12,
        total: 1030,
    }
]

