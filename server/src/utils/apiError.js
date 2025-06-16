export default class ApiError extends Error {
  constructor(code, fields = {}, status = 0) {
    super(code);
    this.code = code;
    this.fields = fields;
    this.statusCode = status;
  }

  toResponse() {
    return {
      status: this.status,
      error: {
        code: this.code,
        fields: this.fields,
      },
    };
  }
}
