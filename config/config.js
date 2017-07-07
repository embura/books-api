export default {
  database: 'books',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: process.env.NODE_ENV ? `${process.env.NODE_ENV}_books.sqlite`:`test_books.sqlite`,
    define: {
      underscore: true,
    },
  },
  jwtSecret: 'S3cr3t5',
  jwtSession: { Session:false }
};
