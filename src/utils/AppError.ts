class AppError extends Error {
  isOptional: boolean;
  status: string;
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOptional = true;
  }
}

export default AppError;
