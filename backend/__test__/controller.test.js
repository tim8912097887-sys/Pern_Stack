import supertestAgent from 'supertest';
import app from '../server.js';
import { createProductService, deleteProductService, getProductService, getProductsService, updateProductService } from '../product/services/product.services.js';
import { ApiError } from '../customerror/apierror.js';

// ✅ Initialize the request object using const. This variable holds the Supertest agent.
const request = supertestAgent(app);
// Mock the indiviual function from module with mock factory function
jest.mock('../product/services/product.services.js',() => ({
    getProductsService: jest.fn(),
    getProductService: jest.fn(),
    createProductService: jest.fn(),
    updateProductService: jest.fn(),
    deleteProductService: jest.fn()
}));

afterEach(() => {
    jest.clearAllMocks();
})

describe('GET /api/products', () => {
    
    // Define the mock data we expect the service to return
    const mockProducts = [
        { id: 1, name: 'Product A',image: 'https://...', price: 100 },
        { id: 2, name: 'Product B',image: 'https://...', price: 200 }
    ];

    it('should return 200 and a list of products', async () => {
        // 1. Configure the mock service function
        // Ensure getProductsService returns our mock data successfully
        getProductsService.mockResolvedValue(mockProducts);

        // 2. Make the HTTP GET request using Supertest
        const response = await request
            .get('/api/products') // The route defined in your Express app
            .expect('Content-Type', /json/) // Check that it returns JSON
            .expect(200); // Check the HTTP status code

        // 3. Assertions
        
        // Check that the service function was actually called
        expect(getProductsService).toHaveBeenCalledTimes(1);
        
        // Check the structure and content of the response body
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual(mockProducts);
        expect(response.body.data).toHaveLength(2);
    });

});

describe('GET /api/products/id',() => {
 
     const id = 1;
     const mockProduct = {
        id,
        name: 'Hat',
        image: 'https://...',
        price: 5.99
     }

    it('should return 200 statusCode and one product',async () => {
        
        getProductService.mockResolvedValue(mockProduct);

        // mock http request
        const response = await request
                              .get(`/api/products/${id}`)
                              .expect('Content-Type', /json/)
                              .expect(200);
        expect(getProductService).toHaveBeenCalledTimes(1);
        expect(getProductService).toHaveBeenCalledWith(id);
        expect(response.body).toHaveProperty('success',true);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual(mockProduct);
    })

    it('should return 400 statusCode and message "Id is number"',async () => {

        // mock http request
        const response = await request
                              .get('/api/products/ty')
                              .expect(400);
        // expect(getProductService).toHaveBeenCalledTimes(0);
        expect(response.body).toHaveProperty('success',false);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('Id is number');
    })

    it(`should return 404 statusCode and message "User with id: ${id} not found"`,async () => {
 
        getProductService.mockRejectedValue(new ApiError(404,`User with id: ${id} not found`));
        // mock http request
        const response = await request
                              .get(`/api/products/${id}`)
                              .expect(404);
        expect(getProductService).toHaveBeenCalledTimes(1);
        expect(getProductService).toHaveBeenCalledWith(id);
        expect(response.body).toHaveProperty('success',false);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual(`User with id: ${id} not found`);
    })
})

describe('POST /api/products',() => {
 
     const mockProduct = {
        id: 1,
        name: 'Hat',
        image: 'https://...',
        price: 5.99
     }

    it('should return 201 statusCode and created product',async () => {
        
        createProductService.mockResolvedValue(mockProduct);

        // mock http request
        const response = await request
                              .post('/api/products')
                              .send(mockProduct)
                              .expect('Content-Type', /json/)
                              .expect(201);
        expect(createProductService).toHaveBeenCalledTimes(1);
        expect(createProductService).toHaveBeenCalledWith(mockProduct);
        expect(response.body).toHaveProperty('success',true);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual(mockProduct);
    })

    it('should return 400 statusCode and message "Please insert all value"',async () => {

        const { id,name,...failInput } = mockProduct;
        // mock http request
        const response = await request
                              .post('/api/products')
                              .send(failInput)
                              .expect(400);
        expect(createProductService).toHaveBeenCalledTimes(0);
        expect(response.body).toHaveProperty('success',false);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('Please insert all value');
    })

    it('should return 400 statusCode and message "Name must be in the length 2 ~ 255"',async () => {

        const failInput = { ...mockProduct,name: 'r' };
        // mock http request
        const response = await request
                              .post('/api/products')
                              .send(failInput)
                              .expect(400);
        expect(createProductService).toHaveBeenCalledTimes(0);
        expect(response.body).toHaveProperty('success',false);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('Name must be in the length 2 ~ 255');
    })
})

describe('PUT /api/products',() => {
 
     const id = 1;
     const mockProduct = {
        id,
        name: 'Hat',
        image: 'https://...',
        price: 5.99
     }

    it('should return 200 statusCode and updated product',async () => {
        
        updateProductService.mockResolvedValue(mockProduct);

        // mock http request
        const response = await request
                              .put(`/api/products/${id}`)
                              .send(mockProduct)
                              .expect('Content-Type', /json/)
                              .expect(200);
        expect(updateProductService).toHaveBeenCalledTimes(1);
        expect(updateProductService).toHaveBeenCalledWith(id,mockProduct);
        expect(response.body).toHaveProperty('success',true);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual(mockProduct);
    })

    it('should return 400 statusCode and message "Id is number"',async () => {
 
        // mock http request
        const response = await request
                              .put('/api/products/1er')
                              .send(mockProduct)
                              .expect(400);
        expect(updateProductService).toHaveBeenCalledTimes(0);
        expect(response.body).toHaveProperty('success',false);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('Id is number');
    })

    it('should return 400 statusCode and message "Please include request body"',async () => {
 

        // mock http request
        const response = await request
                              .put(`/api/products/${id}`)
                              .expect(400);
        expect(updateProductService).toHaveBeenCalledTimes(0);
        expect(response.body).toHaveProperty('success',false);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('Please include request body');
    })

    it(`should return 404 statusCode and message "User with id: ${id} not found"`,async () => {
 
        updateProductService.mockRejectedValue(new ApiError(404,`User with id: ${id} not found`));
        // mock http request
        const response = await request
                              .put('/api/products/1')
                              .send(mockProduct)
                              .expect(404);
        expect(updateProductService).toHaveBeenCalledTimes(1);
        expect(updateProductService).toHaveBeenCalledWith(id,mockProduct);
        expect(response.body).toHaveProperty('success',false);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual(`User with id: ${id} not found`);
    })

})

describe('DELETE /api/products',() => {
 
     const id = 1;

    it('should return 200 statusCode and success message',async () => {
        
        updateProductService.mockResolvedValue();

        // mock http request
        const response = await request
                              .delete(`/api/products/${id}`)
                              .expect(200);

        expect(deleteProductService).toHaveBeenCalledTimes(1);
        expect(deleteProductService).toHaveBeenCalledWith(id);
        expect(response.body).toHaveProperty('success',true);
    })

    it('should return 400 statusCode and message "Id is number"',async () => {
 
        // mock http request
        const response = await request
                              .delete('/api/products/1er')
                              .expect(400);
        expect(deleteProductService).toHaveBeenCalledTimes(0);
        expect(response.body).toHaveProperty('success',false);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('Id is number');
    })

    it(`should return 404 statusCode and message "User with id: ${id} not found"`,async () => {
 
        deleteProductService.mockRejectedValue(new ApiError(404,`User with id: ${id} not found`));
        // mock http request
        const response = await request
                              .delete(`/api/products/${id}`)
                              .expect(404);
        expect(deleteProductService).toHaveBeenCalledTimes(1);
        expect(deleteProductService).toHaveBeenCalledWith(id);
        expect(response.body).toHaveProperty('success',false);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual(`User with id: ${id} not found`);
    })

})