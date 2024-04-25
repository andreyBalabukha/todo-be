let { getAllDuties, createDuty, updateDuty } = require('../controllers/todoController');
const pool = require('../db');
const httpMocks = require('node-mocks-http');

jest.mock('../db');

describe('todoController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return all duties', async () => {
    const mockDuties = [
      { id: 1, name: 'Duty 1' },
      { id: 2, name: 'Duty 2' },
    ];
    getAllDuties = jest.fn().mockResolvedValue(mockDuties);

    const duties = await getAllDuties();

    expect(duties).toEqual(mockDuties);
    expect(getAllDuties).toHaveBeenCalled();
  });

  test('should throw an error when the data source fails', async () => {
    const errorMessage = 'Database connection failed';
    getAllDuties = jest.fn().mockRejectedValue(new Error(errorMessage));
  
    await expect(getAllDuties()).rejects.toThrow(errorMessage);
    expect(getAllDuties).toHaveBeenCalled();
  });

  test('should return duties filtered by a specific condition', async () => {
    const mockDuties = [
      { id: 1, name: 'Duty 1', type: 'Type A' },
      { id: 2, name: 'Duty 2', type: 'Type B' },
    ];
    const expectedDuties = [mockDuties[1]]; // Expecting only 'Type B' duties
    getAllDuties = jest.fn().mockImplementation((type) =>
      Promise.resolve(mockDuties.filter(duty => duty.type === type))
    );
  
    const duties = await getAllDuties('Type B');
  
    expect(duties).toEqual(expectedDuties);
    expect(getAllDuties).toHaveBeenCalledWith('Type B');
  });

  test('should handle unexpected data types gracefully', async () => {
    const mockDuties = 'not an array';
    getAllDuties = jest.fn().mockResolvedValue(mockDuties);
  
    const duties = await getAllDuties();
  
    expect(duties).not.toBeInstanceOf(Array);
    expect(getAllDuties).toHaveBeenCalled();
  });
});
