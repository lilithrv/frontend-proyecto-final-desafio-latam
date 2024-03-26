# Desafio Latam - Final Project: Frontend Development

Members:

- Rodrigo González
- Matias Cuadros
- Leslie Reyes

## Repositories and deploy

- Backend repository [here](https://github.com/proyecto-desafio-latam/backend-proyecto-final-desafio-latam)
- To view the client application deployed, please visit [Mundo Libros](https://mundo-libros-store.vercel.app/)
- Link [API](https://node-bookstore-ww7n.onrender.com/api/v1)

## Description

The second milestone consists of the development of the client application with React for a book ecommerce. This is done using:

- React Router for navigating views by paths
- Components for code reuse and section separation
- Hooks for agile and reactive development
- Context for global state management

## Views

- Home `(/)`: Landing page where store banners and product carousels are displayed.
- Books `(/books)`: Where you can see the complete catalog of books, filter by category and sort by author, title and price.
- BookDetail `(/books/:id)`: It displays specific information of the requested book: name, author, price, stock, category and review.
- Register `(/register)`: Allows you to register a new user in the store.
- Login `(/login)`: For user login and grants access to protected routes.
- User `(/user)`: Access to your registration information, edit profile, view your favorites, add address and view purchase history.
- Cart `(/cart)`: Shows the detail of the purchase, value and quantity, allows to increase or decrease the quantity of each product, and displays the total.

## Protected routes

These routes can only be accessed once logged in and includes:

- `/user`
- `/user/favorites`
- `/user/address`
- At bookDetail: Add to favorites and add to cart buttons
- `/cart`
- `/user/shoppinghistory`

## Administrator panel

This functionality allows the site administrator to add a new book to the catalog, as well as a new author and category. It provides a graphical interface for adding changes and not having to do it from a database terminal.
It is also a protected route and includes:

- Publications `(/publication)` : To add a new book to the catalog
- `(/author)`: To add a new author
- `(/category)` : To add a new category

## Dependencies

- This react project was created with [Vite](https://vitejs.dev/)
- To install dependencies run: `npm install`
- To run de app: `npm run dev`
