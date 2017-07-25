export default {
  database: 'books',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: process.env.NODE_ENV ? `${process.env.NODE_ENV}_books.sqlite` : 'default_books.sqlite',
    define: {
      underscore: true,
    },
  },

  jwtSecret: 'Nã0S3i',
  jwtSession: { session: false },
};
