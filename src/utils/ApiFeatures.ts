import { Model, Query } from 'mongoose';

class ApiFeatures {
  query: Query<any, any>;
  queryString: qs.ParsedQs;
  model: Model<any>;
  currentPage: number;
  limit: number | null;
  documentsLength: number;
  constructor(model: Model<any>, queryString: qs.ParsedQs) {
    this.model = model;
    this.query = model.find();
    this.currentPage = 1;
    this.limit = null;
    this.queryString = queryString;
    this.documentsLength = 0;
  }
  async filter() {
    const queryObj = { ...this.queryString };
    const exclude = ['limit', 'page', 'fields', 'sort'];
    const text = ['text', 'title'];
    exclude.forEach(item => delete queryObj[item]);
    text.forEach(item => {
      if (item in queryObj) {
        queryObj[item] = { $regex: queryObj[item], $options: 'i' };
      }
    });
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);

    this.documentsLength = (await this.query.find(JSON.parse(queryString))).length;
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sort = (this.queryString.sort as string).split(',').join(' ');
      this.query.sort(sort);
    } else {
      this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = (this.queryString.fields as string).split(',').join(' ');
      this.query.select(fields);
    }
    return this;
  }

  paginate() {
    if (this.queryString.limit) {
      const page = +(this.queryString.page || 1);
      let limit: number;
      limit = +this.queryString.limit;
      const skip = (+page - 1) * limit;
      this.currentPage = page;
      this.limit = limit;
      this.query.limit(limit).skip(skip);
      this.query.limit(limit);
    }

    return this;
  }

  countTotalPages() {
    if (this.limit) {
      return Math.ceil(this.documentsLength / this.limit);
    } else {
      return 1;
    }
  }
}
export default ApiFeatures;
