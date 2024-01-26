// test/dbOperations.test.ts
jest.mock('aws-sdk');  // Automatically uses the mock from __mocks__/aws-sdk.js
const { getLenses, saveLens, updateLens, deleteLens } = require('../../lambda/dbOperations');
const AWS = require('aws-sdk');

describe('Database Operations', () => {
    const mockDynamoDB = new AWS.DynamoDB.DocumentClient();

    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        jest.clearAllMocks();
    });

    // Test getLenses
    it('should retrieve lenses', async () => {
        mockDynamoDB.scan.mockReturnValue({ promise: () => Promise.resolve({ Items: ['lens1', 'lens2'] }) });

        const result = await getLenses();
        expect(result).toEqual({ Items: ['lens1', 'lens2'] });
        expect(mockDynamoDB.scan).toHaveBeenCalledWith({ TableName: process.env.LENS_TABLE_NAME });
    });

    // Similar test cases for saveLens, updateLens, and deleteLens...
    // ...

    // Test error handling
    it('should handle errors in getLenses', async () => {
        mockDynamoDB.scan.mockReturnValue({ promise: () => Promise.reject(new Error('Error fetching data')) });

        await expect(getLenses()).rejects.toThrow('Error fetching data');
    });
    // Test saveLens
    it('should save a lens successfully', async () => {
        const lensData = { id: '123', frontRadius: 50, backRadius: 50, thickness: 10, lensTitle: 'Test Lens' };
        mockDynamoDB.put.mockReturnValue({ promise: () => Promise.resolve({}) });

        await saveLens(lensData);
        expect(mockDynamoDB.put).toHaveBeenCalledWith({ TableName: process.env.LENS_TABLE_NAME, Item: lensData });
    });

    it('should handle errors in saveLens', async () => {
        const lensData = { id: '123', frontRadius: 50, backRadius: 50, thickness: 10, lensTitle: 'Test Lens' };
        mockDynamoDB.put.mockReturnValue({ promise: () => Promise.reject(new Error('Error saving data')) });

        await expect(saveLens(lensData)).rejects.toThrow('Error saving data');
    });

    // Test updateLens
    it('should update a lens successfully', async () => {
        const lensData = { frontRadius: 55, backRadius: 45, thickness: 12, lensTitle: 'Updated Lens' };
        mockDynamoDB.update.mockReturnValue({ promise: () => Promise.resolve({}) });

        await updateLens('123', lensData);
        expect(mockDynamoDB.update).toHaveBeenCalledWith(expect.objectContaining({
            TableName: process.env.LENS_TABLE_NAME,
            Key: { id: '123' }
        }));
    });

    it('should handle errors in updateLens', async () => {
        const lensData = { frontRadius: 55, backRadius: 45, thickness: 12, lensTitle: 'Updated Lens' };
        mockDynamoDB.update.mockReturnValue({ promise: () => Promise.reject(new Error('Error updating data')) });

        await expect(updateLens('123', lensData)).rejects.toThrow('Error updating data');
    });

    // Test deleteLens
    it('should delete a lens successfully', async () => {
        mockDynamoDB.delete.mockReturnValue({ promise: () => Promise.resolve({}) });

        await deleteLens('123');
        expect(mockDynamoDB.delete).toHaveBeenCalledWith({ TableName: process.env.LENS_TABLE_NAME, Key: { id: '123' } });
    });

    it('should handle errors in deleteLens', async () => {
        mockDynamoDB.delete.mockReturnValue({ promise: () => Promise.reject(new Error('Error deleting data')) });

        await expect(deleteLens('123')).rejects.toThrow('Error deleting data');
    });


    // Add similar error handling tests for saveLens, updateLens, and deleteLens...
});
