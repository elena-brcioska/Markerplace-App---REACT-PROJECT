<h1>Marketplace App - React Project</h1>


<h2>Description</h2>
A project built using React and React Router, allowing users to create an account, then browse, add to cart and buy items, as well as add new items, and edit existing items. The app fetches Products from a backend server, and displays the information to the user interface. The app also allows the logged in user to change, and post information to the server. The user can create an account, and log in and is authenticated via token which the user gets from the backend server. The token lasts up to one hour, after which the user is logged out. The logged in user is then allowed access to private routes, and can add new products, edit existing products, delete products, and leave comments on products. The added cart items are stored in a context (useContext), and are kept there through the local storage.


<h2>Languages and Utilities Used</h2>

- <b>React</b>
- <b>React Router</b> 
- <b>Material Ui</b>
- <b>JavaScript</b> 

<h2>Project Functionalities</h2>

- <b>Sign Up</b>
- <b>Log in</b>
- <b>Browse products</b>
- <b>Add to Cart (when logged in)</b>
- <b>Create new Product (when logged in)</b>
- <b>Edit existing product (when logged in)</b>
- <b>Delete product (when logged in)</b>
- <b>Filter products by price</b>
- <b>Change display order by price</b>

<h2>Project pages and routes</h2>

- <b>Home Page</b>
- <b>Products Page</b>
- <b>Product Details</b>
- <b>Sign Up Page</b>
- <b>Log in Page</b>
- <b>Add New Product</b>
- <b>Edit Product</b>
- <b>Cart Items Page</b>


<h2>Website walk-through:</h2>

<p align="center">
Home page with responsive navbar and top 3 items listed (by rating): <br/>
<img src="https://i.ibb.co/MBRBxZY/home.png" height="80%" width="80%" alt="Home Page"/>
<img src="https://i.ibb.co/BsWWjDZ/home02.png" height="80%" width="80%" alt="Home Page"/>
<br />
<br />
User Sign Up:  <br/>
<img src="https://i.ibb.co/8XnsfKC/signup.png" width="80%" alt="Sign Up"/>
<br />
<br />
User log in: <br/>
<img src="https://i.ibb.co/RYR0Y3m/login.png" height="80%" width="80%" alt="Log in"/>
<br />
<br />
Product page. When logged in, the option to Add To Cart is available (button is visible):  <br/>
<img src="https://i.ibb.co/st4Lz2G/products.png" height="80%" width="80%" alt="Product Page"/>
<br />
<br />
The product page has a filter menu, which allows the users to filter the products by price. In this example I am ordering the items by ascending order, and showing only the items at $4-$30 price range:  <br/>
<img src="https://i.ibb.co/5kWrVXv/details.png" height="80%" width="80%" alt="Disk Sanitization Steps"/>
<br />
<br />
Product Details Page. When Logged in, the top menu appears that gives the options to the user to edit, and delete a certain product. The product details page also contains user comments, and if logged in - you can leave a comment yourself:  <br/>
<img src="https://i.ibb.co/k0TppXB/products-Filter.png" height="80%" width="80%" alt="Filtered Products"/>
<br />
<br />
When Logged in you can edit existing products or add a new product:  <br/>
<img src="https://i.ibb.co/GpDr1nD/edit.png" height="80%" width="80%" alt="Disk Sanitization Steps"/>
<br />
<br />
The cart items page displays the items that are added to the cart, and allows the user to increse a product's quantity or remove the product from the cart. By clicking proceed, a Thank You modal opens and the cart is cleared. The cart state is saved in a context and localstorage, and on page refresh it's contents are transfered to context from localstorage:  <br/>
<img src="https://i.ibb.co/ckFcWst/Cart.png" height="80%" width="80%" alt="Disk Sanitization Steps"/>
</p>
</p>


<!--
 ```diff
- text in red
+ text in green
! text in orange
# text in gray
@@ text in purple (and bold)@@
```
--!>
