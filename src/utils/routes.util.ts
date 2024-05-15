/**
 * Utility object that contains the routes for different API endpoints.
 */
export const routesUtil = {
    baseUrl: 'http://18.224.251.191:8080',

    categoriesRoute: {
        main: '/api/v1',
        children: {
            /**
             * Route to get categories.
             */
            getCategories: '/category',
        }
    },
    companyRoute: {
        main: '/api/v1',
        children: {
            /**
             * Route to create a company.
             */
            createCompany: '/company',
            /**
             * Route to get all companies.
             */
            getCompanies: '/companies',
            /**
             * Route to delete a company.
             */
            deleteCompany: '/company/',
            /**
             * Route to get a company by ID.
             */
            getCompany: '/company/',
            /**
             * Route to update a company.
             */
            updateCompany: '/company'
        }
    },
    orderRoute: {
        main: '/api/v1',
        children: {
            /**
             * Route to get an order by client ID.
             */
            getOrderByIdClient: '/order/client/',
            /**
             * Route to create an order.
             */
            createOrder: '/order',
            /**
             * Route to delete an order.
             */
            deleteOrder: '/order/'
        }
    },
    productRoute: {
        main: '/api/v1',
        children: {
            /**
             * Route to get products by company.
             */
            getProductsByCompany: '/productsCompany/',
            /**
             * Route to create a product.
             */
            createProduct: '/product',
            /**
             * Route to delete a product.
             */
            deleteProduct: '/product/',
            /**
             * Route to update a product.
             */
            updateProduct: '/product',
            /**
             * Route to send inventory for email.
             */
            sendInventoryForEmail: '/sendInventoryEmailPDF/',
            /**
             * Route to send inventory email PDF for user order.
             */
            sendInventoryEmailPDFUserOrder: '/sendInventoryEmailPDFUserOrder',
            /**
             * Route to get all products.
             */
            getAllProducts: '/products'
        }
    },
    userRoute: {
        main: '/api/v1',
        children: {
            /**
             * Route to create a user.
             */
            createUser: '/user',
            /**
             * Route to validate user login.
             */
            login: '/user/validate'
        }
    }
}