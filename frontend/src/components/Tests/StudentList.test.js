// Import necessary dependencies and the function to test
import axios from 'axios';
import { handleSubmit } from '../Navigation/StudentList';

// Mock axios post method
jest.mock('axios');

describe('handleSubmit function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle successful student addition', async () => {
    const classId = 'classId123';
    const name = 'John Doe';
    const email = 'john@example.com';
    const onStudentAdded = jest.fn();
    const fetchStudents = jest.fn();

    axios.post.mockResolvedValueOnce({ data: {} });

    await handleSubmit({
      preventDefault: jest.fn(),
      name,
      email,
      classId,
      onStudentAdded,
      fetchStudents
    });

    expect(axios.post).toHaveBeenCalledWith(
      `${SERVER_URL}/api/class/${classId}/students`,
      { name, email }
    );
    expect(onStudentAdded).toHaveBeenCalled();
    expect(fetchStudents).toHaveBeenCalled();
  });

  it('should handle error when student email already exists', async () => {
    const classId = 'classId123';
    const name = 'John Doe';
    const email = 'john@example.com';
    const onStudentAdded = jest.fn();
    const fetchStudents = jest.fn();

    axios.post.mockRejectedValueOnce({
      response: { status: 409 }
    });

    const setErrorMessage = jest.fn();

    await handleSubmit({
      preventDefault: jest.fn(),
      name,
      email,
      classId,
      onStudentAdded,
      fetchStudents,
      setErrorMessage
    });

    expect(axios.post).toHaveBeenCalledWith(
      `${SERVER_URL}/api/class/${classId}/students`,
      { name, email }
    );
    expect(setErrorMessage).toHaveBeenCalledWith('A student with the same email already exists.');
    expect(fetchStudents).not.toHaveBeenCalled();
  });

  it('should handle general error', async () => {
    const classId = 'classId123';
    const name = 'John Doe';
    const email = 'john@example.com';
    const onStudentAdded = jest.fn();
    const fetchStudents = jest.fn();

    axios.post.mockRejectedValueOnce(new Error('Some network error'));

    const setErrorMessage = jest.fn();

    await handleSubmit({
      preventDefault: jest.fn(),
      name,
      email,
      classId,
      onStudentAdded,
      fetchStudents,
      setErrorMessage
    });

    expect(axios.post).toHaveBeenCalledWith(
      `${SERVER_URL}/api/class/${classId}/students`,
      { name, email }
    );
    expect(setErrorMessage).toHaveBeenCalledWith('Error adding student. Please try again later.');
    expect(fetchStudents).not.toHaveBeenCalled();
  });
});
