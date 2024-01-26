jest.mock('../../lambda/dbOperations');
jest.mock('../../lambda/validationUtil');
const { handler } = require('../../lambda/lensHandler');
const dbOperations = require('../../lambda/dbOperations');
const validationUtil = require('../../lambda/validationUtil');


it('should return all lenses for GET request', async () => {
    dbOperations.getLenses.mockResolvedValue({ Items: ['lens1', 'lens2'] });
    const event = { httpMethod: 'GET' };

    const response = await handler(event);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(JSON.stringify(['lens1', 'lens2']));
});


it('should return all lenses for GET request', async () => {
    dbOperations.getLenses.mockResolvedValue({ Items: ['lens1', 'lens2'] });
    const event = { httpMethod: 'GET' };

    const response = await handler(event);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(JSON.stringify(['lens1', 'lens2']));
});

it('should save a lens for POST request', async () => {
    const newLens = { frontRadius: 50, backRadius: 50, thickness: 10, lensTitle: 'New Lens' };
    const lensWithId = { ...newLens, id: expect.any(String) };
    validationUtil.isValidLensData.mockReturnValue(true);
    dbOperations.saveLens.mockResolvedValue({});

    const event = { httpMethod: 'POST', body: JSON.stringify(newLens) };

    const response = await handler(event);
    expect(response.statusCode).toEqual(200);
    expect(validationUtil.isValidLensData).toHaveBeenCalledWith(newLens); // Validation before adding id
    expect(dbOperations.saveLens).toHaveBeenCalledWith(lensWithId); // Save operation after adding id
});

// Test successful update for PUT request
it('should update a lens for PUT request', async () => {
    const updatedLens = { id: '123', frontRadius: 55, backRadius: 45, thickness: 12, lensTitle: 'Updated Lens' };
    validationUtil.isValidLensData.mockReturnValue(true);
    dbOperations.updateLens.mockResolvedValue({});

    const event = { httpMethod: 'PUT', body: JSON.stringify(updatedLens) };

    const response = await handler(event);
    expect(response.statusCode).toEqual(200);
    expect(validationUtil.isValidLensData).toHaveBeenCalledWith(updatedLens);
    expect(dbOperations.updateLens).toHaveBeenCalledWith(updatedLens.id, updatedLens);
});

// Test error handling for PUT request
it('should handle validation errors for PUT request', async () => {
    validationUtil.isValidLensData.mockReturnValue(false);
    const event = { httpMethod: 'PUT', body: JSON.stringify({ id: '123' }) };

    const response = await handler(event);
    expect(response.statusCode).toEqual(400);
    expect(response.body).toContain('Invalid lens data');
});

// Test successful deletion for DELETE request
it('should delete a lens for DELETE request', async () => {
    dbOperations.deleteLens.mockResolvedValue({});
    const event = { httpMethod: 'DELETE', pathParameters: { id: '123' } };

    const response = await handler(event);
    expect(response.statusCode).toEqual(200);
    expect(dbOperations.deleteLens).toHaveBeenCalledWith('123');
});

// Test error handling for DELETE request when ID is missing
it('should handle missing ID for DELETE request', async () => {
    const event = { httpMethod: 'DELETE', pathParameters: {} };

    const response = await handler(event);
    expect(response.statusCode).toEqual(400);
    expect(response.body).toContain('Lens ID is required');
});


